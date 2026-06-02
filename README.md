# Pecuária Verde — Redução do Desmatamento na Pecuária

Site educativo, moderno e responsivo sobre a redução do desmatamento na pecuária brasileira. Construído **100% com HTML5, CSS3 e JavaScript puro**, sem frameworks, bibliotecas externas ou estilos inline.

## ✨ Objetivo

Mostrar, de forma clara e visualmente atraente, que é possível conciliar uma pecuária produtiva e competitiva com a preservação das florestas — apresentando o impacto da atividade, tecnologias sustentáveis, políticas ambientais, iniciativas brasileiras e o futuro do setor.

## 🛠️ Tecnologias

- **HTML5 semântico** (`header`, `main`, `section`, `article`, `nav`, `footer`, `button`, `figure`, etc.)
- **CSS3** com variáveis (custom properties), **Flexbox**, **Grid**, Media Queries (mobile-first), animações e transições.
- **JavaScript puro (Vanilla JS)** — manipulação de DOM, IntersectionObserver, localStorage.
- Fontes Google Fonts: **Fraunces** (display) + **Inter** (corpo).

## 🌿 Funcionalidades

- Menu de navegação responsivo com botão **hambúrguer** em mobile.
- **Modo claro / escuro** com persistência via `localStorage`.
- **Smooth scroll** entre seções.
- **Animações ao scroll** (fade + slide) com `IntersectionObserver`.
- **Contadores animados** de estatísticas no hero.
- **Quiz educativo** com 7 perguntas, pontuação e feedback explicativo.
- **Galeria de imagens** com **modal** (fechável por clique fora ou tecla `Esc`).
- Botão flutuante **"Voltar ao topo"**.

## 📁 Estrutura de pastas

```
pecuaria-verde/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
├── img/
│   ├── hero.jpg
│   ├── impacto.jpg
│   ├── tecnologia.jpg
│   ├── politicas.jpg
│   ├── iniciativas.jpg
│   ├── futuro.jpg
│   ├── galeria1.jpg
│   ├── galeria2.jpg
│   ├── galeria3.jpg
│   └── galeria4.jpg
└── assets/        (reservado para fontes, ícones ou recursos extras)
```

## ▶️ Como rodar

Não há build, dependências ou servidor obrigatório. Existem duas opções:

### Opção 1 — Abrir direto no navegador
1. Baixe ou extraia a pasta do projeto.
2. Dê duplo clique em `index.html`.

### Opção 2 — Servidor local (recomendado)
Para evitar restrições de CORS com imagens, sirva a pasta com um servidor estático qualquer:

```bash
# Python 3
cd pecuaria-verde
python3 -m http.server 8080

# ou Node.js (com npx)
npx serve .
```

Depois acesse `http://localhost:8080` no navegador.

## ♿ Acessibilidade

- HTML semântico e landmarks (`header`, `main`, `footer`, `nav`).
- Botões com `aria-label`, `aria-expanded` e `aria-controls`.
- Modal com `role="dialog"` e `aria-modal`.
- Suporte a `prefers-reduced-motion`.
- Contraste adequado em ambos os temas.

## 📚 Conteúdo

Todo o conteúdo textual é fiel à pesquisa fornecida sobre "Redução do Desmatamento na Pecuária", organizado em cards, listas e seções para melhor leitura.

## 📝 Licença

Projeto autoral, criado para fins **educacionais**. Sinta-se livre para estudar, adaptar e compartilhar.
