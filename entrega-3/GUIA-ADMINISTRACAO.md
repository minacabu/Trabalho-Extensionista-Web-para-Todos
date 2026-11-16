# Guia de atualização e administração do site

Para quem cuida do site da Kj Tech. Não é preciso saber programar: basta um editor de texto simples (como o Bloco de Notas ou o VS Code). **Faça uma cópia da pasta antes de mexer.**

## 1. Atualizar contatos (telefone, endereço, horário, WhatsApp)
1. Abra o arquivo `js/config.js`.
2. Escreva os dados entre as aspas, por exemplo `telefone: "(81) 90000-0000",`.
3. O WhatsApp vai só com números, com 55 e DDD: `whatsapp: "5581900000000"`.
4. Salve e abra `contato.html` para conferir. Os dados mudam em todas as páginas. Se um campo ficar vazio, aparece "a confirmar".

## 2. Alterar textos
1. Abra a página (por exemplo `sobre.html`) no editor.
2. Procure o texto que quer mudar e troque só as palavras, sem apagar os sinais `<` e `>`.
3. Salve e recarregue a página no navegador.

## 3. Substituir imagens e a logo
1. Coloque a nova imagem na pasta `img/`.
2. Para a logo, salve como `logo.svg` (ou ajuste o nome nos arquivos `.html`).
3. Toda imagem com informação precisa de descrição: `<img src="img/foto.jpg" alt="Descrição curta da imagem">`. Imagens só decorativas usam `alt=""`.
4. Use apenas imagens próprias, autorizadas ou de uso livre.

## 4. Cadastrar ou remover serviços
Abra `servicos.html` e localize a lista `<ul id="lista-servicos">`. Cada serviço é um bloco assim:

```html
<li class="card" data-busca="palavras que ajudam a achar o serviço">
  <h2>Nome do serviço</h2><p>Descrição curta.</p>
</li>
```
- **Adicionar:** copie um bloco inteiro, cole abaixo e troque os textos.
- **Remover:** apague o bloco inteiro, de `<li` até `</li>`.

## 5. Usar o formulário de orçamento
O formulário valida os campos e mostra mensagens de erro. Ele **não guarda nada** no site. Com o WhatsApp configurado (passo 1), o cliente abre uma conversa com o pedido já escrito e envia por lá. Responda os pedidos pelo WhatsApp ou pelo telefone da loja.

## 6. Cuidados com senhas e dados pessoais
- Não escreva senhas, dados de cartão ou documentos nos arquivos do site.
- Se o site estiver no GitHub, use senha forte e verificação em duas etapas, e não compartilhe o acesso por mensagem.
- Não publique nome, telefone ou foto de clientes sem autorização.
- Nunca peça senha de aparelho no formulário.

## 7. Publicar a alteração
Se o site está no GitHub Pages: envie os arquivos alterados para o repositório (botão *Add file → Upload files* no GitHub, depois *Commit changes*). Em cerca de um minuto o site é atualizado.

## 8. Algo quebrou?
Volte para a cópia que você fez antes. Se o menu ou o formulário pararem de funcionar, provavelmente um sinal `<`, `>` ou aspas foi apagado em algum arquivo.

## 9. Suporte
Equipe do projeto: Nicolas Minduca, Kaynan, Thiago Felipe e Luan Rodrigues. Contato pela Universidade Universo Recife (disciplina Programação para Internet). *Canal de suporte a definir com a Kj Tech.*
