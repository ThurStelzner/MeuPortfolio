(() => {
    const scene = document.querySelector(".office__scene");
    if (!scene) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = null;

    const render = () => {
        currentX += (targetX - currentX) * 0.055;
        currentY += (targetY - currentY) * 0.055;

        scene.style.setProperty("--px", currentX.toFixed(3));
        scene.style.setProperty("--py", currentY.toFixed(3));

        if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
            frame = requestAnimationFrame(render);
        } else {
            frame = null;
        }
    };

    const start = () => {
        if (frame === null) frame = requestAnimationFrame(render);
    };

    window.addEventListener(
        "pointermove",
        (event) => {
            targetX = (event.clientX / window.innerWidth - 0.5) * 2;
            targetY = (event.clientY / window.innerHeight - 0.5) * 2;
            start();
        },
        { passive: true }
    );

    window.addEventListener("pointerleave", () => {
        targetX = 0;
        targetY = 0;
        start();
    });
})();
