/* =========================================================
 * Pecuária Verde — script principal
 * Funcionalidades:
 *  - Menu mobile (hambúrguer)
 *  - Tema claro / escuro com persistência (localStorage)
 *  - Smooth scroll e fechamento do menu ao clicar em link
 *  - Animações ao scroll (IntersectionObserver)
 *  - Contadores animados (estatísticas)
 *  - Quiz interativo com pontuação e feedback
 *  - Galeria com modal (teclas Esc e clique fora)
 *  - Botão "Voltar ao topo"
 * ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
   * 1) MENU MOBILE
   * ------------------------------------------------------- */
  const menuBtn = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  // Fecha o menu ao clicar em qualquer link de navegação
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------
   * 2) TEMA CLARO / ESCURO (com persistência)
   * ------------------------------------------------------- */
  const themeBtn = document.getElementById("themeToggle");
  const STORAGE_KEY = "pv-theme";

  // Inicializa o tema com base no que está salvo (ou preferência do SO)
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) {
    document.body.classList.add("dark");
  }

  themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  });

  /* ---------------------------------------------------------
   * 3) ANIMAÇÕES AO SCROLL
   *    Adiciona a classe .in nos elementos .reveal quando aparecem
   * ------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------------
   * 4) CONTADORES ANIMADOS
   * ------------------------------------------------------- */
  const counters = document.querySelectorAll(".counter");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easing easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* ---------------------------------------------------------
   * 5) QUIZ INTERATIVO
   * ------------------------------------------------------- */
  const questions = [
    {
      q: "Qual é uma das principais causas do desmatamento ligado à pecuária no Brasil?",
      options: [
        "Expansão desordenada de pastagens de baixa produtividade",
        "Reflorestamento intensivo",
        "Importação de carne bovina",
        "Uso de energia solar em fazendas"
      ],
      a: 0,
      explain: "Sistemas extensivos de baixa produtividade exigem grandes áreas, pressionando a abertura de novas pastagens."
    },
    {
      q: "O que significa a sigla ILPF, considerada uma das estratégias mais modernas?",
      options: [
        "Integração Lavoura-Pecuária-Floresta",
        "Iniciativa Legal de Preservação Florestal",
        "Indústria de Laticínios e Produtos Florestais",
        "Instituto de Lavouras Permanentes Federais"
      ],
      a: 0,
      explain: "ILPF combina árvores, agricultura e pecuária na mesma área, trazendo benefícios ambientais e econômicos."
    },
    {
      q: "Qual prática permite recuperar a vegetação e aumentar a produtividade movimentando o gado entre áreas?",
      options: [
        "Confinamento total",
        "Rotação de pastagens",
        "Queima controlada",
        "Pastejo livre permanente"
      ],
      a: 1,
      explain: "A rotação dá tempo para o capim se regenerar, melhorando a alimentação animal e reduzindo a degradação."
    },
    {
      q: "Qual programa do governo brasileiro oferece crédito para práticas de baixo carbono?",
      options: ["Pronaf Verde", "Programa ABC+", "Plano Safra Climático", "Bolsa Floresta"],
      a: 1,
      explain: "O Programa ABC+ financia recuperação de pastagens, sistemas integrados e tecnologias sustentáveis."
    },
    {
      q: "Como frigoríficos verificam se o gado vem de áreas legalmente exploradas?",
      options: [
        "Apenas por declaração do produtor",
        "Por sistemas de rastreabilidade e monitoramento por satélite",
        "Por inspeção visual no abate",
        "Por meio de pesquisas com consumidores"
      ],
      a: 1,
      explain: "Rastreabilidade + satélite tornam a cadeia transparente e impedem compras de áreas desmatadas ilegalmente."
    },
    {
      q: "Qual benefício direto as árvores trazem ao gado em sistemas integrados?",
      options: [
        "Aumentam o consumo de água por animal",
        "Reduzem a produtividade da pastagem",
        "Fornecem sombra e conforto térmico",
        "Atraem mais pragas"
      ],
      a: 2,
      explain: "A sombra melhora o bem-estar animal e os índices produtivos, além de sequestrar carbono."
    },
    {
      q: "Reduzir o desmatamento na pecuária significa, principalmente:",
      options: [
        "Diminuir a produção de carne no Brasil",
        "Produzir de forma mais eficiente e sustentável na mesma área",
        "Substituir todo o rebanho por agricultura",
        "Importar mais alimentos"
      ],
      a: 1,
      explain: "Tecnologia e boas práticas permitem produzir mais sem abrir novas áreas — o futuro do setor."
    }
  ];

  const quizQuestionEl = document.getElementById("quizQuestion");
  const quizOptionsEl = document.getElementById("quizOptions");
  const quizFeedbackEl = document.getElementById("quizFeedback");
  const quizStepEl = document.getElementById("quizStep");
  const quizNextBtn = document.getElementById("quizNext");
  const quizProgressBar = document.querySelector("#quizProgress span");
  const quizContent = document.getElementById("quizContent");
  const quizResult = document.getElementById("quizResult");
  const quizScoreEl = document.getElementById("quizScore");
  const quizTotalEl = document.getElementById("quizTotal");
  const quizMessageEl = document.getElementById("quizMessage");
  const quizRestartBtn = document.getElementById("quizRestart");

  let currentIdx = 0;
  let score = 0;
  let answered = false;

  quizTotalEl.textContent = questions.length.toString();

  function renderQuestion() {
    answered = false;
    const item = questions[currentIdx];
    quizStepEl.textContent = `Pergunta ${currentIdx + 1} de ${questions.length}`;
    quizQuestionEl.textContent = item.q;
    quizFeedbackEl.textContent = "";
    quizFeedbackEl.className = "quiz-feedback";
    quizNextBtn.disabled = true;
    quizNextBtn.textContent = currentIdx === questions.length - 1 ? "Ver resultado" : "Próxima";
    quizProgressBar.style.width = `${(currentIdx / questions.length) * 100}%`;

    quizOptionsEl.innerHTML = "";
    item.options.forEach((opt, i) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = opt;
      btn.addEventListener("click", () => selectOption(btn, i));
      li.appendChild(btn);
      quizOptionsEl.appendChild(li);
    });
  }

  function selectOption(btn, i) {
    if (answered) return;
    answered = true;
    const item = questions[currentIdx];
    const correctIdx = item.a;
    const allBtns = quizOptionsEl.querySelectorAll("button");

    allBtns.forEach((b, idx) => {
      b.disabled = true;
      if (idx === correctIdx) b.classList.add("correct");
    });

    if (i === correctIdx) {
      btn.classList.add("correct");
      score++;
      quizFeedbackEl.textContent = "✓ Correto! " + item.explain;
      quizFeedbackEl.classList.add("correct");
    } else {
      btn.classList.add("wrong");
      quizFeedbackEl.textContent = "✗ Não foi dessa vez. " + item.explain;
      quizFeedbackEl.classList.add("wrong");
    }
    quizNextBtn.disabled = false;
  }

  quizNextBtn.addEventListener("click", () => {
    if (currentIdx < questions.length - 1) {
      currentIdx++;
      renderQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    quizProgressBar.style.width = "100%";
    quizContent.hidden = true;
    quizResult.hidden = false;
    quizScoreEl.textContent = score.toString();

    let msg;
    const pct = score / questions.length;
    if (pct === 1) msg = "Excelente! Você é um(a) verdadeiro(a) defensor(a) da pecuária sustentável.";
    else if (pct >= 0.7) msg = "Muito bom! Você domina os principais conceitos da pecuária responsável.";
    else if (pct >= 0.4) msg = "Bom começo! Reveja as seções e tente novamente para fixar o conteúdo.";
    else msg = "Vale a pena ler o conteúdo e tentar de novo — o tema é importante para o futuro do país.";
    quizMessageEl.textContent = msg;
  }

  quizRestartBtn.addEventListener("click", () => {
    currentIdx = 0;
    score = 0;
    quizContent.hidden = false;
    quizResult.hidden = true;
    renderQuestion();
  });

  renderQuestion();

  /* ---------------------------------------------------------
   * 6) GALERIA + MODAL
   * ------------------------------------------------------- */
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const modalCloseBtn = document.getElementById("modalClose");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      modalImg.src = item.dataset.src;
      modalImg.alt = item.querySelector("img").alt;
      modalCaption.textContent = item.dataset.caption || "";
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.hidden = true;
    modalImg.src = "";
    document.body.style.overflow = "";
  }
  modalCloseBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  /* ---------------------------------------------------------
   * 7) BOTÃO VOLTAR AO TOPO
   * ------------------------------------------------------- */
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("visible", window.scrollY > 600);
  });
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------------------------------------------------
   * 8) ANO DINÂMICO NO RODAPÉ
   * ------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
