# Documentação do projeto: Hamburgueria

Versão: 1.0  
Idioma: pt-BR

---

Sumário rápido
- Objetivo: site simples de cardápio com fluxo "Pedir" → formulário preenchido → confirmação → redirecionamento ao início.
- Arquivos principais:
  - index.html — ofertas em destaque (home).
  - cardapio.html — listagem completa de produtos.
  - Contato.html — meios de contato.
  - formulario.html — formulário dinâmico de pedido.
  - estilo.css — estilos e tema.
  - script.js — lógica de interação (pedir, preencher formulário, redirecionamento).
  - Imagens (referenciadas nas tags img).

---

1) Menu de navegação
- Propósito: permitir navegação entre Início, Cardápio e Contato.
- Localização: `index.html`, `cardapio.html`, `Contato.html`, `formulario.html` (cada página contém uma `.menu`).
- Comportamento: links <a> apontam para arquivos locais (`index.html`, `cardapio.html`, `Contato.html`).
- Observações: manter nomes de arquivos consistentes (ex.: `Cardapio.html` vs `cardapio.html` — usar lowercase padronizado).

2) Cartões de produto (cards)
- Propósito: apresentar produto, descrição, preço e ação "Pedir".
- Localização: `index.html` (resumo/ofertas) e `cardapio.html` (cardápio completo).
- Estrutura HTML típica:
  - `article.cartaoOferta`
    - `img` — imagem do produto
    - `h3` — nome do produto
    - `p.descricao` — descrição curta
    - `p.preco` — preço formatado (ex.: "R$ 19,90")
    - `button.btn-pedir` — aciona função pedir(this)


3) Função pedir(button)
- Localização: `script.js`.
- Propósito: extrair nome, descrição e preço do card do botão clicado e redirecionar para `formulario.html` com esses dados na query string.
- Fluxo:
  1. `const card = button.closest('.cartaoOferta')`
  2. Lê `h3`, `.descricao`, `.preco`
  3. Constrói `URLSearchParams` com keys `nomeProduto`, `descricao`, `preco`
  4. `window.location.href = 'formulario.html?' + params.toString()`
- Nota: valores devem ser curados/encodificados automaticamente pelo URLSearchParams.

4) Auto-preenchimento do formulário
- Localização: `formulario.html` + `script.js` (trecho que executa em DOMContentLoaded).
- Propósito: ao abrir `formulario.html?nomeProduto=...&descricao=...&preco=...` preencher:
  - `#produtoNome` — título exibido
  - `#produtoDesc` — descrição exibida
  - `#produtoPreco` — preço em destaque
  - `#produtoHidden` e `#precoHidden` — campos ocultos para submissão
  - `#pedido` textarea recebe texto inicial com "Produto: ...\nDescrição: ..."
- Observações: se a query string estiver vazia, formulário abre vazio.

5) Botão "Voltar ao início"
- Localização: `formulario.html` (dentro da `.menu`).
- Propósito: link simples `<a class="btn-voltar" href="index.html">` para retornar à página inicial.

6) Envio do pedido e redirecionamento
- Localização: `script.js` (listener de submit em `#pedidoForm`).
- Comportamento atual:
  - O handler `e.preventDefault()` impede envio real.
  - Cria um elemento `.pedido-toast` com mensagem de sucesso.
  - Após ~1.1s, anima a opacidade para 0, remove o toast e redireciona para `index.html`.
- Pontos para produção:
  - Atualmente não há envio ao servidor; para produção implementar `fetch()` POST antes do redirecionamento.
  - Validar/escapar campos do usuário antes do envio.

7) Estilos (tema e componente)
- Localização: `estilo.css`.
- Variáveis CSS no :root definem paleta: `--accent`, `--accent-2`, `--card`, `--bg`, etc.
- Componentes estilizados importantes:
  - `.menu`, `.cartaoOferta`, `.gridOferta`, `.btn-pedir`
  - `form`, `.resumo-pedido`, `.btn-voltar`, `.pedido-toast`
- Nota: estilos já garantem responsividade básica via media query em <=520px.

8) Contato
- Localização: `Contato.html`.
- Apresenta "cards" com ícones (whatsapp.png, instagram.png, telegrama.png).
- Observação: adicionar links reais (ex.: whatsapp deep link) melhora usabilidade.

9) Fluxo de dados completo (resumido)
- Usuário clica "Pedir" → `pedir(this)` extrai dados do card → redireciona para `formulario.html?params` → `formulario.html` é aberto, `script.js` popula campos e resumo → usuário ajusta nome, acompanhamentos, observações → clica Enviar → script mostra toast → redireciona para `index.html`.

10) Acessibilidade e validação
- Recomendações:
  - Adicionar atributos aria (ex.: aria-live já usado no `.resumo-pedido`).
  - Garantir foco lógico após redirecionamentos (ex.: colocar foco no primeiro input do formulário).
  - Validar formato do campo `preco` se for usado para cálculos (converter "R$ 19,90" para número).
  - Tratar leitura por leitores de tela (manter labels associados via for/id).

11) Testes manuais sugeridos
- Teste 1: Na `index.html`, clique em um "Pedir" e confirme que `formulario.html` abre com nome/descrição/preço preenchidos.
- Teste 2: Preencha nome e clique Enviar → verificar toast e redirecionamento para `index.html`.
- Teste 3: Abrir `formulario.html` diretamente sem query string → garantir formulário vazio.
- Teste 4: Remover ou alterar `p.preco` no card e testar comportamento (verificar valores nulos).

12) Melhorias futuras (prioritárias)
- Implementar envio ao servidor (API) com POST no listener de submit; tratar erros e retries.
- Permitir múltiplos itens (carrinho) em vez de pedido único.
- Ajuste de quantidade e cálculo automático de total.



13) Observações de manutenção
- Manter nomes de arquivos consistentes (p.ex. `cardapio.html` vs `Cardapio.html`) para evitar erros em sistemas case-sensitive.
- Centralizar strings de UI se for evoluir para várias línguas.



