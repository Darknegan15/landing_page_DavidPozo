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

    const menuToggle = document.querySelector("#ckbox");
    const menuButton = document.querySelector(".drawer");
    const mobileMenu = document.querySelector(".menu-box");

    if (menuToggle && menuButton && mobileMenu) {
        const setMenuState = (isOpen) => {
            menuToggle.checked = isOpen;
            mobileMenu.classList.toggle("is-open", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
        };

        menuButton.setAttribute("role", "button");
        menuButton.setAttribute("aria-controls", "main-menu");
        menuButton.setAttribute("aria-expanded", "false");
        mobileMenu.id = "main-menu";

        menuToggle.addEventListener("change", () => setMenuState(menuToggle.checked));

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenuState(false));
        });

        document.addEventListener("click", (event) => {
            if (menuToggle.checked && !event.target.closest("nav")) {
                setMenuState(false);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menuToggle.checked) {
                setMenuState(false);
                menuButton.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 1180) setMenuState(false);
        });
    }
});
