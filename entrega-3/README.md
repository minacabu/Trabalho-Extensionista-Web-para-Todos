# Web para Todos – Site da Kj Tech

Site da **Kj Tech**, assistência técnica de aparelhos eletrônicos no Ipsep (Recife-PE), desenvolvido no trabalho extensionista "Web para Todos" da disciplina Programação para Internet (Universidade Universo Recife, 2026.2, prof. Carlos Silva).

**Equipe:** Nicolas Minduca, Kaynan, Thiago Felipe e Luan Rodrigues.

## Como ver o site

Não precisa instalar nada. Baixe o repositório e abra `index.html` no navegador.
Para publicar de graça: GitHub → *Settings* → *Pages* → branch `main`, pasta `/ (root)`; o `index.html` da raiz leva para esta pasta.

## Estrutura

```
index.html        Início
servicos.html     Serviços (com busca)
sobre.html        Sobre a Kj Tech e o projeto
contato.html      Contato
orcamento.html    Formulário de solicitação de orçamento
css/style.css     Estilos (responsivo)
js/config.js      Dados da loja (telefone, horário, WhatsApp)
js/main.js        Menu, busca de serviços e validação do formulário
img/              Imagens do site
GUIA-ADMINISTRACAO.md   Guia de atualização do site
```

## Recursos de acessibilidade

Link "ir para o conteúdo", navegação por teclado com foco visível, hierarquia de títulos, campos com rótulo, erros em texto (não só cor), contraste alto, `lang="pt-BR"` e menu adaptado ao celular.

## Pendências (dependem da Kj Tech)

- Confirmar o número de WhatsApp da loja e preencher em `js/config.js` (ativa o envio do orçamento pela conversa).
- Publicar informações de garantia somente após confirmação oficial.

## Privacidade

O formulário não envia nem guarda dados. Com o WhatsApp configurado, o visitante apenas abre uma conversa com a mensagem pronta e decide se envia.
