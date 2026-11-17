(() => {
  'use strict';

  const body = document.body;
  const ui = document.querySelector('.ui');
  const stagePerspective = document.querySelector('.stagePerspective');
  const stageContainer = document.querySelector('.stageContainer');
  const stage = document.querySelector('.stage');
  const projectsList = document.querySelector('.projects');
  const mobileNav = document.querySelector('.mobile-nav');
  const colorMode = document.querySelector('.color-mode');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const aboutOverlay = document.getElementById('sobre');
  const skillsOverlay = document.getElementById('habilidades');
  const experiencesOverlay = document.getElementById('experiencias');
  const projectsOverlay = document.getElementById('projetos');
  const caseOverlay = document.getElementById('case-study');

  const caseKicker = document.getElementById('case-kicker');
  const caseTitle = document.getElementById('case-title');
  const caseDescription = document.getElementById('case-description');
  const caseStatus = document.getElementById('case-status');
  const caseYear = document.getElementById('case-year');
  const caseType = document.getElementById('case-type');
  const caseStack = document.getElementById('case-stack');
  const caseLink = document.getElementById('case-link');

  const experienceDetailOverlay = document.getElementById('experiencia-detalhe');
  const experienceKicker = document.getElementById('experiencia-kicker');
  const experienceTitle = document.getElementById('experiencia-titulo');
  const experienceRole = document.getElementById('experiencia-role');
  const experienceLead = document.getElementById('experiencia-lead');
  const experienceText = document.getElementById('experiencia-texto');
  const experienceMeta = document.getElementById('experiencia-meta');
  const experiencePhotos = document.getElementById('experiencia-fotos');
  const experiencePhotoGrid = document.getElementById('experiencia-foto-grid');

  const desktopQuery = window.matchMedia('(min-width: 768px)');
  const hoverQuery = window.matchMedia('(hover: hover)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const originalTitle = document.title;

  const projects = {
    petalliance: {
      kicker: 'Projeto — 01',
      title: 'Pet<br>Alliance',
      description: 'PetAlliance é um aplicativo criado para ajudar donos de animais a terem boas crias, com segurança e facilidade — reunindo informações, cuidados e acompanhamento em um só lugar.',
      status: 'Em desenvolvimento',
      year: '2025',
      type: 'Aplicativo',
      stack: 'Python · MySQL',
      href: 'https://github.com/ThurStelzner/PetAlliance'
    },
    vitrine: {
      kicker: 'Projeto — 02',
      title: 'Vitrine<br>GMM',
      description: 'Vitrine digital para a GMM Refrigeração, assistência técnica especializada em eletrodomésticos, ar-condicionado, refrigeradores, freezers e fogões.',
      status: 'Finalizado',
      year: '2025',
      type: 'Site institucional',
      stack: 'HTML · CSS · JavaScript',
      href: 'https://github.com/ThurStelzner/VitrineGMM'
    },
    falai: {
      kicker: 'Projeto — 03',
      title: 'SA:<br>Falaí',
      description: 'Situação de Aprendizagem 2025 do Sesi Senai Sul de Joinville — um projeto desenvolvido em equipe para colocar em prática lógica, banco de dados e desenvolvimento web.',
      status: 'Finalizado',
      year: '2025',
      type: 'Projeto acadêmico',
      stack: 'Python · MySQL · HTML/CSS',
      href: 'https://github.com/ThurStelzner/FalaiSA'
    }
  };

  /* ======================================================================
     EXPERIÊNCIAS — edite aqui o texto de cada tela "Veja mais".

     - lead: frase de abertura (aparece maior)
     - text: um item por parágrafo
     - meta: pares de rótulo + valor na coluna da direita
     - photos: lista de imagens. Se src ficar vazio, aparece um espaço
       reservado tracejado para você colocar a foto depois.
       Ex.: { src: 'assets/images/jedi-1.jpg', alt: 'Descrição', caption: 'Legenda' }
     ====================================================================== */

  const experiences = {
    worldskills: {
      kicker: 'Experiência — 01',
      title: 'World<br>Skills',
      role: 'Recomendação — Sesi Senai',
      lead: 'Durante o curso técnico em Desenvolvimento de Sistemas fui um dos seis alunos recomendados pelo Sesi Senai para o WorldSkills, a maior competição de educação profissional do mundo.',
      text: [
        'A recomendação nasceu de projetos, situações de aprendizagem e desafios práticos que exigiram lógica, organização e trabalho em equipe.',
        'O WorldSkills acontece a cada dois anos e reúne estudantes de dezenas de países em provas práticas de habilidade técnica. A indicação do Sesi Senai reconhece o desempenho e a dedicação dentro da instituição.',
        'Com os colegas recomendados, participamos de CTFs de treinamento — desafios de segurança no formato captura de bandeira — e, com isso, conquistamos cursos da Cisco Networking Academy.',
        'Para mim, a recomendação vale mais do que um prêmio: foi o sinal de que o caminho que escolhi — programar, resolver problemas e aprender todos os dias — está dando certo.'
      ],
      meta: [
        { label: 'Tipo', value: 'Recomendação' },
        { label: 'Instituição', value: 'Sesi Senai' },
        { label: 'Curso', value: 'Técnico em Desenvolvimento de Sistemas' },
        { label: 'Grupo', value: '6 alunos recomendados' },
        { label: 'Destaques', value: 'CTFs de treinamento e cursos da Cisco Networking Academy' }
      ],
      photos: []
    },
    jedi: {
      kicker: 'Experiência — 02',
      title: 'JEDI',
      role: 'Participação — Join.Valle',
      lead: 'Participei do JEDI — Jornada de Empreendedorismo, Desenvolvimento e Inovação, promovido pelo Join.Valle em Joinville.',
      text: [
        'O JEDI é uma jornada de empreendedorismo e inovação que coloca equipes diante de problemas reais de empresas e da sociedade.',
        'Durante o programa acompanhei mentorias, trabalhei em equipe na construção de uma solução e apresentei a proposta ao final da jornada.',
        'Foi a experiência que mais aproximou tecnologia de negócio: entender o problema, ouvir o usuário, testar uma ideia e defender a proposta em público.'
      ],
      meta: [
        { label: 'Tipo', value: 'Participação' },
        { label: 'Programa', value: 'Jornada de Empreendedorismo, Desenvolvimento e Inovação' },
        { label: 'Organização', value: 'Join.Valle' },
        { label: 'Local', value: 'Joinville · SC' }
      ],
      photos: [
        { src: '', alt: '', caption: '' }
      ]
    }
  };

  let overlayCurrent = null;
  let overlayLastFocus = null;
  let overlayReturn = null;
  let overlayRestoreFocus = true;
  let overlayTransitionTimer = null;
  let projectsLastFocus = null;
  let experiencesLastFocus = null;
  let caseDocumentTitle = '';
  let experienceDocumentTitle = '';

  /* ------------------------------------------------------------------ */
  /* Scroll / perspectiva                                                */
  /* ------------------------------------------------------------------ */

  let isDesktop = desktopQuery.matches;
  let currentScroll = 0;
  let targetScroll = 0;
  let rafId = null;
  let resizeTimer = null;

  function layoutStage() {
    isDesktop = desktopQuery.matches;

    if (!isDesktop) {
      stageContainer.style.height = '';
      stage.style.transform = '';
      currentScroll = 0;
      targetScroll = 0;
      return;
    }

    const stageHeight = Math.max(stage.scrollHeight, window.innerHeight);
    stageContainer.style.height = `${stageHeight}px`;

    const maxScroll = Math.max(0, stageHeight - window.innerHeight);
    if (stagePerspective.scrollTop > maxScroll) {
      stagePerspective.scrollTop = maxScroll;
    }

    currentScroll = stagePerspective.scrollTop;
    targetScroll = currentScroll;

    if (!body.classList.contains('intro')) {
      stage.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;
    }
  }

  function tick() {
    if (isDesktop && !body.classList.contains('intro')) {
      if (reducedMotion.matches) {
        currentScroll = targetScroll;
      } else {
        currentScroll += (targetScroll - currentScroll) * 0.12;
        if (Math.abs(targetScroll - currentScroll) < 0.25) {
          currentScroll = targetScroll;
        }
      }

      stage.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;
    }

    rafId = window.requestAnimationFrame(tick);
  }

  stagePerspective.addEventListener('scroll', () => {
    targetScroll = stagePerspective.scrollTop;

    if (reducedMotion.matches && isDesktop) {
      currentScroll = targetScroll;
      stage.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      layoutStage();

      if (!desktopQuery.matches) {
        body.classList.remove('uiHover');
      }
    }, 120);
  });

  desktopQuery.addEventListener('change', () => {
    layoutStage();
    if (desktopQuery.matches) {
      body.classList.remove('mobileNavOpen');
      mobileNav.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-label', 'Abrir menu');
    }
  });

  /* ------------------------------------------------------------------ */
  /* UI / navegação                                                      */
  /* ------------------------------------------------------------------ */

  if (hoverQuery.matches) {
    ui.addEventListener('mouseenter', () => {
      body.classList.add('uiHover');
    });

    ui.addEventListener('mouseleave', () => {
      body.classList.remove('uiHover');
    });
  }

  function closeMobileNav({ restoreFocus = false } = {}) {
    const wasOpen = body.classList.contains('mobileNavOpen');
    body.classList.remove('mobileNavOpen');
    mobileNav.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-label', 'Abrir menu');

    if (wasOpen && restoreFocus) {
      mobileNav.focus({ preventScroll: true });
    }
  }

  mobileNav.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = body.classList.toggle('mobileNavOpen');
    mobileNav.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileNav.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    body.classList.remove('uiHover');
  });

  ui.querySelectorAll('a[href], button').forEach((item) => {
    if (item === mobileNav || item.closest('.color-mode')) return;
    item.addEventListener('click', () => {
      closeMobileNav({ restoreFocus: true });
    });
  });

  /* ------------------------------------------------------------------ */
  /* Overlays                                                            */
  /* ------------------------------------------------------------------ */

  function focusableElements(container) {
    return Array.from(
      container.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter((element) => element.offsetParent !== null);
  }

  function overlayStateClass(overlay) {
    if (overlay === aboutOverlay) return 'aboutShow';
    if (overlay === skillsOverlay) return 'skillsShow';
    if (overlay === experiencesOverlay || overlay === experienceDetailOverlay) return 'experiencesShow';
    if (overlay === projectsOverlay) return 'projectsShow';
    return 'caseShow';
  }

  function openOverlay(overlay, { focus = true, trigger = null, restoreFocus = true } = {}) {
    if (!overlay || overlayCurrent === overlay) return;

    const previous = overlayCurrent;

    if (previous) {
      if (previous === projectsOverlay) {
        projectsLastFocus = overlayLastFocus;
      }

      if (previous === experiencesOverlay) {
        experiencesLastFocus = overlayLastFocus;
      }

      closeOverlay({ restoreFocus: false });
    }

    overlayCurrent = overlay;
    overlayRestoreFocus = restoreFocus;
    overlayReturn = previous === projectsOverlay && overlay === caseOverlay
      ? projectsOverlay
      : previous === experiencesOverlay && overlay === experienceDetailOverlay
        ? experiencesOverlay
        : null;
    overlayLastFocus = overlay === projectsOverlay && projectsLastFocus
      ? projectsLastFocus
      : overlay === experiencesOverlay && experiencesLastFocus
        ? experiencesLastFocus
        : trigger || document.activeElement;

    closeMobileNav();
    body.classList.remove('uiHover');

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    body.classList.add('overlayOpen');
    body.classList.add(overlayStateClass(overlay));

    const scroller = overlay.querySelector('.overlay-scroll');
    if (scroller) scroller.scrollTop = 0;

    if (overlay === aboutOverlay) {
      document.title = 'Sobre — Arthur I. Stelzner';
    } else if (overlay === skillsOverlay) {
      document.title = 'Habilidades — Arthur I. Stelzner';
    } else if (overlay === experiencesOverlay) {
      document.title = 'Experiências — Arthur I. Stelzner';
    } else if (overlay === experienceDetailOverlay) {
      document.title = experienceDocumentTitle || 'Experiências — Arthur I. Stelzner';
    } else if (overlay === projectsOverlay) {
      document.title = 'Projetos — Arthur I. Stelzner';
    } else if (caseDocumentTitle) {
      document.title = caseDocumentTitle;
    }

    if (focus) {
      window.setTimeout(() => {
        const closeButton = overlay.querySelector('.btn-back');
        if (closeButton) closeButton.focus({ preventScroll: true });
      }, reducedMotion.matches ? 0 : 450);
    }
  }

  function closeOverlay({ restoreFocus = true } = {}) {
    if (!overlayCurrent) return;

    const overlay = overlayCurrent;
    const returnTo = overlayReturn;
    const focusTarget = overlayLastFocus;
    const shouldRestoreFocus = restoreFocus && overlayRestoreFocus;

    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');

    /* Devolve o botão clicado à inclinação de repouso. */
    clearSelectedRows();

    body.classList.remove('aboutShow', 'skillsShow', 'experiencesShow', 'projectsShow', 'caseShow', 'overlayOpen');
    overlayCurrent = null;
    overlayReturn = null;
    document.title = originalTitle;

    if (returnTo) {
      openOverlay(returnTo, { focus: false, restoreFocus: overlayRestoreFocus });

      if (shouldRestoreFocus && focusTarget && typeof focusTarget.focus === 'function') {
        window.setTimeout(() => {
          focusTarget.focus({ preventScroll: true });
        }, 60);
      }

      return;
    }

    if (shouldRestoreFocus && focusTarget && typeof focusTarget.focus === 'function') {
      window.setTimeout(() => {
        if (focusTarget && typeof focusTarget.focus === 'function') {
          focusTarget.focus({ preventScroll: true });
        }
      }, 80);
    } else {
      // clique com o mouse: não devolve o foco, senão o item fica com o visual de hover/seleção
      const active = document.activeElement;
      if (active && typeof active.blur === 'function') {
        active.blur();
      }
    }

    overlayLastFocus = null;
  }

  /* Os links 3D são transformados: o ponteiro acerta o <li>, não o <a>.
     A delegação garante o clique físico sem disparar o link duas vezes. */
  let clickedWithPointer = false;

  projectsList.addEventListener('click', (event) => {
    const row = event.target.closest('.projectsLi');
    if (!row) return;

    const link = row.querySelector('a');
    if (!link || event.target.closest('a') === link) return;

    event.preventDefault();
    clickedWithPointer = event.detail !== 0;
    link.click();
    clickedWithPointer = false;
  });

  /* Só devolve o foco ao item quando a abertura veio do teclado:
     no mouse isso deixaria o link com o visual de hover/seleção. */
  function openedByKeyboard(event) {
    return event.detail === 0 && !clickedWithPointer;
  }

  document.querySelectorAll('[data-open-about]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openOverlayWithTransition(aboutOverlay, button, openedByKeyboard(event));
    });
  });

  document.querySelectorAll('[data-open-skills]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openOverlayWithTransition(skillsOverlay, button, openedByKeyboard(event));
    });
  });

  document.querySelectorAll('[data-open-experiences]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openOverlayWithTransition(experiencesOverlay, button, openedByKeyboard(event));
    });
  });

  document.querySelectorAll('[data-open-projects]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openOverlayWithTransition(projectsOverlay, button, openedByKeyboard(event));
    });
  });

  document.querySelectorAll('[data-close-overlay]').forEach((button) => {
    button.addEventListener('click', () => {
      closeOverlay();
    });
  });

  document.querySelectorAll('[data-close-overlays]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      if (overlayCurrent) {
        closeOverlay();
      }

      closeMobileNav();

      if (desktopQuery.matches) {
        stagePerspective.scrollTo({
          top: 0,
          behavior: reducedMotion.matches ? 'auto' : 'smooth'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: reducedMotion.matches ? 'auto' : 'smooth'
        });
      }
    });
  });

  [aboutOverlay, skillsOverlay, experiencesOverlay, experienceDetailOverlay, projectsOverlay, caseOverlay].forEach((overlay) => {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay || event.target.classList.contains('overlay-scroll')) {
        closeOverlay();
      }
    });

    overlay.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;

      const focusable = focusableElements(overlay);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    if (overlayCurrent) {
      closeOverlay();
    } else if (body.classList.contains('mobileNavOpen')) {
      closeMobileNav();
      mobileNav.focus({ preventScroll: true });
    }
  });

  /* ------------------------------------------------------------------ */
  /* Detalhes dos projetos                                               */
  /* ------------------------------------------------------------------ */

  function fillCaseStudy(project) {
    caseKicker.textContent = project.kicker;
    caseTitle.innerHTML = project.title;
    caseDescription.textContent = project.description;
    caseStatus.textContent = project.status;
    caseYear.textContent = project.year;
    caseType.textContent = project.type;
    caseStack.textContent = project.stack;
    caseLink.href = project.href;
    caseLink.setAttribute('aria-label', `Ver ${project.title.replace('<br>', ' ')} no GitHub`);
    caseDocumentTitle = `${project.title.replace('<br>', ' ')} — Arthur I. Stelzner`;
    document.title = caseDocumentTitle;
  }

  /* ------------------------------------------------------------------ */
  /* Detalhes da experiência                                             */
  /* ------------------------------------------------------------------ */

  function buildPhoto(photo) {
    const figure = document.createElement('figure');
    figure.className = 'experience-photo';

    const frame = document.createElement('div');
    frame.className = 'experience-photo-frame';

    if (photo.src) {
      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.alt || '';
      img.loading = 'lazy';
      frame.appendChild(img);
    } else {
      frame.classList.add('is-empty');
      const placeholder = document.createElement('span');
      placeholder.className = 'experience-photo-placeholder';
      placeholder.textContent = 'Espaço reservado para a foto';
      const hint = document.createElement('span');
      hint.textContent = 'Substitua pela imagem do evento';
      placeholder.appendChild(hint);
      frame.appendChild(placeholder);
    }

    figure.appendChild(frame);

    if (photo.caption) {
      const caption = document.createElement('figcaption');
      caption.textContent = photo.caption;
      figure.appendChild(caption);
    }

    return figure;
  }

  function fillExperienceDetail(experience) {
    experienceKicker.textContent = experience.kicker;
    experienceTitle.innerHTML = experience.title;
    experienceRole.textContent = experience.role;
    experienceLead.textContent = experience.lead;

    experienceText.textContent = '';
    experience.text.forEach((paragraph) => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      experienceText.appendChild(p);
    });

    experienceMeta.textContent = '';
    experience.meta.forEach((item) => {
      const row = document.createElement('div');
      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = item.label;
      const value = document.createElement('span');
      value.textContent = item.value;
      row.appendChild(label);
      row.appendChild(value);
      experienceMeta.appendChild(row);
    });

    experiencePhotoGrid.textContent = '';
    const photos = experience.photos || [];

    if (photos.length) {
      photos.forEach((photo) => {
        experiencePhotoGrid.appendChild(buildPhoto(photo));
      });

      experiencePhotos.hidden = false;
    } else {
      experiencePhotos.hidden = true;
    }

    const plainTitle = experience.title.replace('<br>', ' ');
    experienceDocumentTitle = `${plainTitle} — Arthur I. Stelzner`;
    document.title = experienceDocumentTitle;
  }

  function clearSelectedRows() {
    projectsList.querySelectorAll('.projectsLi.isSelected').forEach((row) => {
      row.classList.remove('isSelected');
    });
  }

  function focusOverlayClose(overlay) {
    const closeButton = overlay.querySelector('.btn-back');
    if (closeButton) closeButton.focus({ preventScroll: true });
  }

  function openOverlayWithTransition(overlay, trigger = null, restoreFocus = true) {
    if (reducedMotion.matches) {
      openOverlay(overlay, { trigger, restoreFocus });
      return;
    }

    clearSelectedRows();
    window.clearTimeout(overlayTransitionTimer);

    const selectedRow = trigger && trigger.closest ? trigger.closest('.projectsLi') : null;

    /* Links 3D: o botão clicado gira suavemente até ficar reto e só então o
       painel abre por cima. Assim ele anima até a posição final em vez de
       "pular" para ela, e a cortina não esconde o movimento. */
    if (selectedRow) {
      selectedRow.classList.add('isSelected');

      overlayTransitionTimer = window.setTimeout(() => {
        openOverlay(overlay, { focus: false, trigger, restoreFocus });
        window.setTimeout(() => focusOverlayClose(overlay), 500);
      }, 700);

      return;
    }

    /* Demais gatilhos (cards de projeto) mantêm o fade pela cortina. */
    body.classList.add('loading', 'outro');

    overlayTransitionTimer = window.setTimeout(() => {
      openOverlay(overlay, { focus: false, trigger, restoreFocus });
      body.classList.remove('outro');
      body.classList.remove('loading');

      window.setTimeout(() => focusOverlayClose(overlay), 500);
    }, 700);
  }

  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    card.addEventListener('click', (event) => {
      const project = projects[card.dataset.project];
      if (!project) return;

      event.preventDefault();

      fillCaseStudy(project);
      openOverlayWithTransition(caseOverlay, card, openedByKeyboard(event));
    });
  });

  document.querySelectorAll('.experience-more[data-experience]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const experience = experiences[button.dataset.experience];
      if (!experience) return;

      event.preventDefault();

      fillExperienceDetail(experience);
      openOverlayWithTransition(experienceDetailOverlay, button, openedByKeyboard(event));
    });
  });

  /* ------------------------------------------------------------------ */
  /* Temas                                                               */
  /* ------------------------------------------------------------------ */

  const themes = ['night-mode', 'light-mode'];
  const themeRoot = document.documentElement;
  const themeStorageKey = 'theme';
  const themeColors = {
    'night-mode': '#000000',
    'light-mode': '#f2f2f2'
  };

  function saveTheme(theme) {
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
      /* modo privado ou armazenamento bloqueado: segue só com a classe aplicada */
    }
  }

  function setTheme(theme, { persist = true } = {}) {
    themes.forEach((item) => themeRoot.classList.remove(item));
    themeRoot.classList.add(theme);

    if (persist) saveTheme(theme);

    if (colorMode) {
      const isLight = theme === 'light-mode';
      const label = isLight ? 'Mudar para o tema escuro' : 'Mudar para o tema claro';

      colorMode.dataset.mode = theme.replace('-mode', '');
      colorMode.setAttribute('aria-label', label);
      colorMode.setAttribute('title', label);
    }

    if (themeMeta) {
      themeMeta.setAttribute('content', themeColors[theme]);
    }
  }

  if (colorMode) {
    setTheme(themes.find((theme) => themeRoot.classList.contains(theme)) || 'night-mode');

    colorMode.addEventListener('click', () => {
      setTheme(themeRoot.classList.contains('night-mode') ? 'light-mode' : 'night-mode');
    });
  }

  window.addEventListener('storage', (event) => {
    if (event.key !== themeStorageKey) return;
    if (themes.includes(event.newValue)) {
      setTheme(event.newValue, { persist: false });
    }
  });

  /* ------------------------------------------------------------------ */
  /* Entrada                                                             */
  /* ------------------------------------------------------------------ */

  function boot() {
    layoutStage();
    tick();

    window.setTimeout(() => {
      body.classList.remove('loading');
    }, reducedMotion.matches ? 0 : 500);

    window.setTimeout(() => {
      body.classList.remove('intro');
      targetScroll = stagePerspective.scrollTop;
      currentScroll = targetScroll;
    }, reducedMotion.matches ? 30 : 3050);
  }

  if (document.readyState === 'complete') {
    boot();
  } else {
    window.addEventListener('load', boot, { once: true });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      layoutStage();
    });
  }

  window.addEventListener('beforeunload', () => {
    if (rafId) window.cancelAnimationFrame(rafId);
    window.clearTimeout(overlayTransitionTimer);
  });
})();
