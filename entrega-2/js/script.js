/* KJ Tech Web – interações e validação de formulários */
(function () {
  "use strict";

  /* ---------- Menu responsivo ---------- */
  var botaoMenu = document.getElementById("menu-botao");
  var menu = document.getElementById("menu-principal");
  if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberto");
      botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
  }

  /* ---------- Ano no rodapé ---------- */
  var ano = document.getElementById("ano");
  if (ano) { ano.textContent = new Date().getFullYear(); }

  /* ---------- Validação de formulários ---------- */
  function mostrarErro(campo, texto) {
    var grupo = campo.closest(".campo");
    var alvo = document.getElementById(campo.id + "-erro");
    if (grupo) { grupo.classList.add("invalido"); }
    if (alvo) { alvo.textContent = texto; }
    campo.setAttribute("aria-invalid", "true");
  }

  function limparErro(campo) {
    var grupo = campo.closest(".campo");
    var alvo = document.getElementById(campo.id + "-erro");
    if (grupo) { grupo.classList.remove("invalido"); }
    if (alvo) { alvo.textContent = ""; }
    campo.removeAttribute("aria-invalid");
  }

  function textoLimpo(valor) {
    return valor.replace(/\s+/g, " ").trim();
  }

  function validarCampo(campo) {
    var valor = campo.type === "checkbox" ? campo.checked : textoLimpo(campo.value);
    limparErro(campo);

    if (campo.required && (valor === "" || valor === false)) {
      mostrarErro(campo, campo.dataset.msgObrigatorio || "Preencha este campo.");
      return false;
    }
    if (valor === "") { return true; }

    if (campo.dataset.tipo === "contato") {
      var ehEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
      var digitos = valor.replace(/\D/g, "");
      var ehTelefone = /^[\d\s()+-]+$/.test(valor) && digitos.length >= 10 && digitos.length <= 13;
      if (!ehEmail && !ehTelefone) {
        mostrarErro(campo, "Informe um telefone com DDD (ex.: 81 99999-9999) ou um e-mail válido.");
        return false;
      }
    }
    var min = parseInt(campo.dataset.min, 10);
    if (min && valor.length < min) {
      mostrarErro(campo, "Escreva pelo menos " + min + " caracteres.");
      return false;
    }
    return true;
  }

  document.querySelectorAll("form[data-validar]").forEach(function (form) {
    var campos = form.querySelectorAll("input, select, textarea");
    var areaMsg = form.querySelector(".mensagem");

    campos.forEach(function (campo) {
      campo.addEventListener("blur", function () { validarCampo(campo); });
      campo.addEventListener("input", function () {
        if (campo.closest(".campo").classList.contains("invalido")) { validarCampo(campo); }
      });
    });

    form.addEventListener("submit", function (evento) {
      evento.preventDefault();
      var primeiroErro = null;
      campos.forEach(function (campo) {
        if (!validarCampo(campo) && !primeiroErro) { primeiroErro = campo; }
      });

      if (areaMsg) {
        areaMsg.classList.remove("oculto", "sucesso", "falha");
      }

      if (primeiroErro) {
        if (areaMsg) {
          areaMsg.classList.add("falha");
          areaMsg.textContent = "Não foi possível enviar. Corrija os campos indicados.";
        }
        primeiroErro.focus();
        return;
      }

      /* VERSÃO DEMONSTRATIVA: nenhum dado é enviado ou armazenado.
         Para receber solicitações de verdade, o beneficiário deve
         definir o canal oficial (ver README.md). */
      if (areaMsg) {
        areaMsg.classList.add("sucesso");
        areaMsg.textContent = "Solicitação validada com sucesso! (Versão de demonstração: nenhum dado foi enviado.)";
      }
      form.reset();
    });
  });
})();
