(function () {
  "use strict";
  var cfg = window.KJ_CONFIG || {};

  // Preenche contatos vindos de config.js (mantém "a confirmar" se vazio)
  document.querySelectorAll("[data-contato]").forEach(function (el) {
    var v = cfg[el.getAttribute("data-contato")];
    if (v) { el.textContent = v; }
  });
  var zap = document.getElementById("zap"), zl = document.getElementById("zap-link");
  if (zap && zl && cfg.whatsapp) {
    zl.href = "https://wa.me/" + String(cfg.whatsapp).replace(/\D/g, "");
    zap.hidden = false;
  }

  // Menu em telas pequenas
  var btn = document.querySelector(".menu-btn"), menu = document.getElementById("menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberto");
      btn.setAttribute("aria-expanded", String(aberto));
    });
  }

  // Busca de serviços
  var busca = document.getElementById("busca");
  if (busca) {
    var itens = Array.prototype.slice.call(document.querySelectorAll("#lista-servicos .card"));
    var res = document.getElementById("resultado"), vazio = document.getElementById("vazio");
    var norm = function (s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
    busca.addEventListener("input", function () {
      var q = norm(busca.value.trim()), n = 0;
      itens.forEach(function (li) {
        var alvo = norm(li.textContent + " " + li.getAttribute("data-busca"));
        var ok = !q || alvo.indexOf(q) !== -1;
        li.hidden = !ok; if (ok) { n++; }
      });
      vazio.hidden = n !== 0;
      res.textContent = q ? n + (n === 1 ? " serviço encontrado." : " serviços encontrados.") : "";
    });
  }

  // Formulário de orçamento
  var form = document.getElementById("form-orc");
  if (form) {
    var msgs = {
      nome: "Informe seu nome.",
      contato: "Informe um telefone com DDD ou um e-mail válido.",
      aparelho: "Informe a marca e o modelo do aparelho.",
      servico: "Escolha o tipo de problema.",
      descricao: "Descreva o problema com pelo menos 10 caracteres.",
      aceite: "Marque a caixa para podermos entrar em contato."
    };
    var valido = function (id, v) {
      v = v.trim();
      if (id === "contato") {
        var tel = v.replace(/\D/g, "");
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || (tel.length >= 10 && tel.length <= 13 && !/[A-Za-z]/.test(v));
      }
      if (id === "descricao") { return v.length >= 10; }
      return v.length > 0;
    };
    var checa = function (id) {
      var el = document.getElementById(id), er = document.getElementById("e-" + id);
      var ok = id === "aceite" ? el.checked : valido(id, el.value);
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      er.textContent = ok ? "" : msgs[id]; er.hidden = ok;
      return ok;
    };
    var ids = Object.keys(msgs);
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      // Ao sair do campo, só MOSTRA erro (nunca esconde, para o layout não se mexer durante o clique)
      el.addEventListener("blur", function () { if ((el.value || el.getAttribute("aria-invalid")) && el.type !== "checkbox") { var ok = id === "aceite" ? el.checked : valido(id, el.value); if (!ok) { checa(id); } } });
      // Ao digitar/alterar um campo que estava com erro, revalida e some com o erro quando corrigido
      var rev = function () { if (el.getAttribute("aria-invalid") === "true") { checa(id); } };
      el.addEventListener("input", rev); el.addEventListener("change", rev);
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var erros = ids.filter(function (id) { return !checa(id); });
      var geral = document.getElementById("resumo-erros");
      if (erros.length) {
        geral.textContent = "Corrija " + erros.length + (erros.length === 1 ? " campo" : " campos") + " antes de enviar.";
        geral.hidden = false;
        document.getElementById(erros[0]).focus();
        return;
      }
      geral.hidden = true;
      var d = {}; ids.forEach(function (id) { d[id] = document.getElementById(id).value.trim(); });
      var txt = "Olá, Kj Tech! Meu nome é " + d.nome + ". Aparelho: " + d.aparelho + ". Problema (" + d.servico + "): " + d.descricao + ". Contato: " + d.contato + ".";
      var box = document.getElementById("sucesso"), p = document.getElementById("sucesso-txt");
      p.textContent = "";
      if (cfg.whatsapp) {
        p.appendChild(document.createTextNode("Seus dados não foram guardados no site. Para enviar o pedido, abra a conversa abaixo e confirme o envio."));
        var a = document.createElement("a");
        a.className = "btn"; a.target = "_blank"; a.rel = "noopener";
        a.href = "https://wa.me/" + String(cfg.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent(txt);
        a.textContent = "Enviar pelo WhatsApp";
        p.appendChild(document.createElement("br")); p.appendChild(a);
      } else {
        p.textContent = "Os campos foram validados, mas o canal de atendimento da Kj Tech ainda não foi configurado, por isso nada foi enviado nem guardado. Esta é a versão de demonstração.";
      }
      form.hidden = true; box.hidden = false; box.focus();
    });
  }
})();
