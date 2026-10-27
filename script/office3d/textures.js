// Texturas geradas em canvas — mantêm o projeto leve e 100% offline.
import * as THREE from 'three';

function roundRectPath(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
}

function makeCanvasTexture(width, height, draw, { anisotropy = 8 } = {}) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    draw(ctx, width, height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = anisotropy;
    return texture;
}

export function makeWoodFloorTexture() {
    return makeCanvasTexture(512, 512, (ctx, w, h) => {
        ctx.fillStyle = '#b3814f';
        ctx.fillRect(0, 0, w, h);

        const planks = 6;
        const plank = h / planks;
        for (let i = 0; i < planks; i++) {
            const y = i * plank;
            const tone = Math.sin(i * 2.1) * 0.05;
            ctx.fillStyle = tone > 0
                ? `rgba(255, 226, 190, ${tone})`
                : `rgba(70, 40, 22, ${-tone})`;
            ctx.fillRect(0, y, w, plank);

            for (let g = 0; g < 22; g++) {
                const gy = y + Math.random() * plank;
                const gx = Math.random() * w * 0.7;
                const gw = 40 + Math.random() * w * 0.4;
                ctx.strokeStyle = `rgba(92, 57, 30, ${0.04 + Math.random() * 0.06})`;
                ctx.lineWidth = 0.6 + Math.random() * 1.3;
                ctx.beginPath();
                ctx.moveTo(gx, gy);
                ctx.quadraticCurveTo(gx + gw * 0.5, gy + (Math.random() - 0.5) * 8, gx + gw, gy);
                ctx.stroke();
            }

            ctx.fillStyle = 'rgba(58, 33, 17, 0.45)';
            ctx.fillRect(0, y, w, 2);
        }
    });
}

export function makeRugTexture() {
    return makeCanvasTexture(512, 512, (ctx, w, h) => {
        const c = w / 2;
        ctx.fillStyle = '#d9c8b0';
        ctx.beginPath();
        ctx.arc(c, c, c - 2, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 1200; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.sqrt(Math.random()) * (c - 10);
            const x = c + Math.cos(angle) * radius;
            const y = c + Math.sin(angle) * radius;
            ctx.fillStyle = `rgba(120, 95, 65, ${0.02 + Math.random() * 0.05})`;
            ctx.fillRect(x, y, 1.5, 1.5);
        }

        ctx.strokeStyle = '#a8bfa4';
        ctx.lineWidth = 16;
        ctx.beginPath();
        ctx.arc(c, c, c - 44, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(168, 191, 164, 0.5)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(c, c, c - 72, 0, Math.PI * 2);
        ctx.stroke();
    });
}

export function createScreen() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;

    const codeLines = [
        [['const', '#c792ea'], [' arthur', '#82aaff'], [' = {', '#d8dee9']],
        [['  curso', '#82aaff'], [': ', '#d8dee9'], ['"Dev de Sistemas"', '#c3e88d'], [',', '#d8dee9']],
        [['  stack', '#82aaff'], [': [', '#d8dee9'], ['"HTML"', '#c3e88d'], [', ', '#d8dee9'], ['"CSS"', '#c3e88d'], [', ', '#d8dee9'], ['"JS"', '#c3e88d'], ['],', '#d8dee9']],
        [['  local', '#82aaff'], [': ', '#d8dee9'], ['"Joinville, SC"', '#c3e88d'], [',', '#d8dee9']],
        [['  foco', '#82aaff'], [': ', '#d8dee9'], ['"full-stack"', '#c3e88d'], [',', '#d8dee9']],
        [['};', '#d8dee9']]
    ];

    function draw(cursorOn = true) {
        const w = canvas.width;
        const h = canvas.height;

        ctx.fillStyle = '#0e1218';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#1c222b';
        ctx.fillRect(0, 0, w, 64);

        const dots = [['#e06c5a', 36], ['#e0b45a', 68], ['#6fbf73', 100]];
        for (const [color, x] of dots) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, 32, 8, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.fillStyle = '#2a3340';
        roundRectPath(ctx, 140, 18, 190, 32, 8);
        ctx.fill();
        ctx.fillStyle = '#b9c6d3';
        ctx.font = '600 18px ui-monospace, Menlo, Consolas, monospace';
        ctx.fillText('arthur.ts', 158, 41);

        ctx.font = '22px ui-monospace, Menlo, Consolas, monospace';
        let y = 134;
        for (const parts of codeLines) {
            let x = 40;
            for (const [text, color] of parts) {
                ctx.fillStyle = color;
                ctx.fillText(text, x, y);
                x += ctx.measureText(text).width;
            }
            y += 48;
        }

        ctx.fillStyle = '#0a0d12';
        ctx.fillRect(0, h - 104, w, 104);

        ctx.font = '26px ui-monospace, Menlo, Consolas, monospace';
        ctx.fillStyle = '#7ee787';
        const prompt = 'arthur@portfolio:~$';
        ctx.fillText(prompt, 40, h - 40);

        if (cursorOn) {
            const promptWidth = ctx.measureText(prompt).width;
            ctx.fillRect(52 + promptWidth, h - 66, 14, 30);
        }

        ctx.font = '14px ui-monospace, Menlo, Consolas, monospace';
        ctx.fillStyle = '#5c6b7a';
        ctx.fillText('UTF-8  ·  TypeScript', 40, h - 12);

        const glow = ctx.createRadialGradient(w * 0.28, h * 0.2, 20, w * 0.28, h * 0.2, w * 0.7);
        glow.addColorStop(0, 'rgba(135, 183, 255, 0.10)');
        glow.addColorStop(1, 'rgba(135, 183, 255, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);

        texture.needsUpdate = true;
    }

    draw(true);
    return { texture, draw };
}

export function makePhoneTexture() {
    return makeCanvasTexture(512, 1024, (ctx, w, h) => {
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, '#1e2a4a');
        gradient.addColorStop(0.55, '#3b2c63');
        gradient.addColorStop(1, '#6a3f73');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        const blob = (x, y, r, color) => {
            const rad = ctx.createRadialGradient(x, y, 0, x, y, r);
            rad.addColorStop(0, color);
            rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = rad;
            ctx.fillRect(x - r, y - r, r * 2, r * 2);
        };
        blob(400, 170, 280, 'rgba(138, 94, 168, 0.55)');
        blob(90, 880, 260, 'rgba(43, 90, 138, 0.5)');

        ctx.fillStyle = '#0b0d10';
        roundRectPath(ctx, 196, 26, 120, 26, 13);
        ctx.fill();

        ctx.textAlign = 'center';
        ctx.fillStyle = '#f7f2e7';
        ctx.font = '600 108px Inter, system-ui, sans-serif';
        ctx.fillText('09:41', 256, 300);

        ctx.fillStyle = 'rgba(215, 210, 200, 0.85)';
        ctx.font = '30px Inter, system-ui, sans-serif';
        ctx.fillText('ter, 27 out', 256, 356);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.10)';
        roundRectPath(ctx, 76, 430, 360, 140, 24);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(126, 500, 26, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        roundRectPath(ctx, 176, 476, 200, 12, 6);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
        roundRectPath(ctx, 176, 502, 140, 10, 5);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        roundRectPath(ctx, 196, 966, 120, 10, 5);
        ctx.fill();

        ctx.textAlign = 'start';
    });
}

export function makeKeyboardTexture() {
    return makeCanvasTexture(1024, 720, (ctx, w, h) => {
        ctx.fillStyle = '#242a31';
        ctx.fillRect(0, 0, w, h);

        const sheen = ctx.createLinearGradient(0, 0, 0, h);
        sheen.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
        sheen.addColorStop(1, 'rgba(0, 0, 0, 0.12)');
        ctx.fillStyle = sheen;
        ctx.fillRect(0, 0, w, h);

        const cols = 14;
        const rows = 5;
        const margin = 64;
        const gap = 8;
        const keyW = (w - margin * 2 - gap * (cols - 1)) / cols;
        const rowsBottom = 430;
        const keyH = (rowsBottom - margin - gap * (rows - 1)) / rows;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = margin + c * (keyW + gap);
                const y = margin + r * (keyH + gap);
                ctx.fillStyle = '#39424b';
                roundRectPath(ctx, x, y, keyW, keyH, 10);
                ctx.fill();
                ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
                roundRectPath(ctx, x, y, keyW, keyH * 0.45, 10);
                ctx.fill();
            }
        }

        ctx.fillStyle = '#31383f';
        roundRectPath(ctx, 352, 486, 320, 182, 22);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 3;
        roundRectPath(ctx, 352, 486, 320, 182, 22);
        ctx.stroke();
    });
}

export function makeNameplateTexture() {
    return makeCanvasTexture(512, 112, (ctx, w, h) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, '#e9c37a');
        gradient.addColorStop(0.5, '#c8943c');
        gradient.addColorStop(1, '#9a6a24');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(255, 240, 200, 0.55)';
        ctx.lineWidth = 3;
        ctx.strokeRect(8, 8, w - 16, h - 16);

        ctx.fillStyle = '#3a2a12';
        ctx.textAlign = 'center';
        ctx.font = '600 40px Inter, system-ui, sans-serif';
        try {
            ctx.letterSpacing = '8px';
        } catch (error) {
            /* propriedade opcional */
        }
        ctx.fillText('ARTHUR I. STELZNER', w / 2, h / 2 + 14);
        ctx.textAlign = 'start';
    });
}

export function makePostitTexture({ base, base2, fold, foldLight, ink, variant = 0 }) {
    return makeCanvasTexture(512, 512, (ctx, w, h) => {
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, base);
        gradient.addColorStop(1, base2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = fold;
        ctx.beginPath();
        ctx.moveTo(w - 150, h);
        ctx.lineTo(w, h - 150);
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = foldLight;
        ctx.beginPath();
        ctx.moveTo(w - 150, h);
        ctx.lineTo(w, h - 150);
        ctx.lineTo(w - 60, h - 60);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = ink;
        ctx.globalAlpha = 0.38;
        ctx.lineWidth = 16;
        ctx.lineCap = 'round';

        const line = (x1, y1, x2, y2) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        };

        if (variant === 0) {
            line(70, 120, 300, 120);
            line(70, 180, 430, 180);
            line(70, 240, 220, 240);
            ctx.beginPath();
            ctx.arc(320, 320, 52, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(296, 320);
            ctx.lineTo(314, 340);
            ctx.lineTo(348, 296);
            ctx.stroke();
        } else if (variant === 1) {
            line(70, 130, 240, 130);
            line(70, 190, 430, 190);
            ctx.beginPath();
            ctx.moveTo(180, 300);
            ctx.lineTo(212, 338);
            ctx.lineTo(288, 240);
            ctx.stroke();
        } else {
            line(70, 120, 430, 120);
            line(70, 180, 300, 180);
            line(70, 240, 430, 240);
            ctx.beginPath();
            ctx.moveTo(210, 320);
            ctx.lineTo(180, 360);
            ctx.lineTo(210, 400);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(300, 320);
            ctx.lineTo(330, 360);
            ctx.lineTo(300, 400);
            ctx.stroke();
        }

        ctx.globalAlpha = 1;
    });
}

export function makePhotoPlaceholderTexture() {
    return makeCanvasTexture(512, 512, (ctx, w, h) => {
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, '#cfc7ba');
        gradient.addColorStop(0.55, '#b9b0a1');
        gradient.addColorStop(1, '#a2998a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(116, 106, 90, 0.6)';
        ctx.lineWidth = 14;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.arc(330, 168, 44, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(96, 404);
        ctx.lineTo(220, 282);
        ctx.lineTo(300, 354);
        ctx.lineTo(370, 300);
        ctx.lineTo(420, 404);
        ctx.stroke();
    });
}

export function makeSteamTexture() {
    return makeCanvasTexture(128, 128, (ctx, w, h) => {
        const gradient = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
    }, { anisotropy: 1 });
}
