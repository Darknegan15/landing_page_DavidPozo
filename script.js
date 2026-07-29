document.addEventListener("DOMContentLoaded", () => {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener("pointermove", (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        glow.classList.add("is-visible");
    }, { passive: true });
    window.addEventListener("pointerleave", () => glow.classList.remove("is-visible"));

    const animateGlow = () => {
        currentX += (targetX - currentX) * 0.13;
        currentY += (targetY - currentY) * 0.13;
        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        requestAnimationFrame(animateGlow);
    };
    animateGlow();

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".menu-box a").forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
});
