# Arthur I. Stelzner — Portfólio

Portfólio pessoal de **Arthur I. Stelzner**, desenvolvedor full stack.
Interface com tipografia display em perspectiva 3D, títulos vazados no hover, navegação fixa e
dois modos de cor.

## Como abrir

O site é estático e não precisa de build. Basta abrir o `index.html` no navegador ou servir a
pasta com um servidor local:

```bash
npx serve .
# ou
python -m http.server 8000
```

## Estrutura

```text
.
├── index.html          # página única (sobre, habilidades, experiências, projetos e detalhes)
├── css/style.css       # layout, tipografia, animações e temas
├── js/app.js           # interações, scroll 3D, overlays e troca de tema
└── assets/
    ├── favicon.svg
    └── images/         # fotos pessoais preservadas
```

## Recursos

- Projetos em tipografia display 3D com hover vazado e transição para o overlay de detalhes
- Overlay "sobre" com bio, disponibilidade e contato
- Overlay "habilidades" com formação, níveis de domínio e ferramentas
- Overlay "experiências" com eventos e reconhecimentos (WorldSkills, JEDI)
- Dois temas: noturno (preto, branco e dourado) e claro
- Tema salvo no `localStorage` e aplicado no `<head>`, antes da primeira pintura
- Intro com cortina, logo em slide-up e projetos se abrindo em perspectiva
- Scroll com inércia no desktop e navegação por menu no mobile
- Suporte a `prefers-reduced-motion`, foco visível e navegação por teclado

## Projetos

| Projeto | Status | Stack |
| --- | --- | --- |
| PetAlliance | Em desenvolvimento | Python · MySQL |
| Vitrine GMM | Finalizado | HTML · CSS · JavaScript |
| SA: Falaí | Finalizado | Python · MySQL · HTML/CSS |
