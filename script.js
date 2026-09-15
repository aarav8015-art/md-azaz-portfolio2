document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const stage = document.getElementById("photoStage");
    const image = document.getElementById("profileImage");
    const header = document.querySelector(".site-header");
    const progress = document.querySelector(".scroll-line span");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const sections = document.querySelectorAll("section[id]");

    /* cursor */
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (dot) {
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        }
    }, { passive: true });

    function cursorLoop() {
        ringX += (mouseX - ringX) * 0.13;
        ringY += (mouseY - ringY) * 0.13;

        if (ring) {
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
        }

        requestAnimationFrame(cursorLoop);
    }

    cursorLoop();

    document.querySelectorAll("a, .skill-card, .experience-item, .education-item")
        .forEach(el => {
            el.addEventListener("mouseenter", () => body.classList.add("cursor-hover"));
            el.addEventListener("mouseleave", () => body.classList.remove("cursor-hover"));
        });

    /* header + scroll progress */
    function onScroll() {
        const scrollTop = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (scrollTop / max) * 100 : 0;

        if (progress) progress.style.width = `${pct}%`;
        if (header) header.classList.toggle("scrolled", scrollTop > 45);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* portrait parallax */
    if (stage && image) {
        let targetRX = 0;
        let targetRY = 0;
        let targetX = 0;
        let targetY = 0;

        let currentRX = 0;
        let currentRY = 0;
        let currentX = 0;
        let currentY = 0;

        function portraitLoop() {
            currentRX += (targetRX - currentRX) * 0.06;
            currentRY += (targetRY - currentRY) * 0.06;
            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;

            image.style.transform = `
                translate3d(${currentX}px, ${currentY}px, 0)
                rotateX(${currentRX}deg)
                rotateY(${currentRY}deg)
                scale(1.035)
            `;

            requestAnimationFrame(portraitLoop);
        }

        portraitLoop();

        stage.addEventListener("mousemove", (e) => {
            const r = stage.getBoundingClientRect();

            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;

            targetRY = x * 5;
            targetRX = -y * 3.5;
            targetX = x * 14;
            targetY = y * 8;
        });

        stage.addEventListener("mouseleave", () => {
            targetRX = 0;
            targetRY = 0;
            targetX = 0;
            targetY = 0;
        });

        stage.addEventListener("touchmove", (e) => {
            const touch = e.touches[0];
            const r = stage.getBoundingClientRect();

            const x = (touch.clientX - r.left) / r.width - 0.5;
            const y = (touch.clientY - r.top) / r.height - 0.5;

            targetRY = x * 4;
            targetRX = -y * 3;
            targetX = x * 10;
            targetY = y * 6;
        }, { passive: true });

        stage.addEventListener("touchend", () => {
            targetRX = 0;
            targetRY = 0;
            targetX = 0;
            targetY = 0;
        });
    }

    /* scroll reveal */
    const revealItems = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.12
    });

    revealItems.forEach(item => revealObserver.observe(item));

    /* stagger cards */
    document.querySelectorAll(".skills-grid, .education-list, .experience-list")
        .forEach(group => {
            [...group.children].forEach((item, i) => {
                item.style.transitionDelay = `${i * 70}ms`;
            });
        });

    /* active navigation */
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const id = entry.target.id;

            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${id}`
                );
            });
        });
    }, {
        rootMargin: "-40% 0px -50% 0px"
    });

    sections.forEach(section => navObserver.observe(section));

    /* magnetic buttons */
    document.querySelectorAll(".magnetic").forEach(button => {
        button.addEventListener("mousemove", (e) => {
            const r = button.getBoundingClientRect();

            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;

            button.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });
    });

    /* smooth anchors */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const id = link.getAttribute("href");
            const target = document.querySelector(id);

            if (!target) return;

            e.preventDefault();

            const offset = header ? header.offsetHeight : 0;

            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - offset,
                behavior: "smooth"
            });
        });
    });
});
