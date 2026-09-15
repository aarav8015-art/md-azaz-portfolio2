document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const body = document.body;
    const header = document.querySelector(".site-header");
    const scrollLine = document.querySelector(".scroll-line span");

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    const photoStage = document.querySelector("#photoStage");
    const profileImage = document.querySelector("#profileImage");

    /* =========================
       PAGE LOAD
    ========================= */

    window.setTimeout(() => {
        body.classList.remove("loading");

        document.querySelectorAll(".reveal-up").forEach((el, index) => {
            setTimeout(() => {
                el.classList.add("visible");
            }, 150 + index * 80);
        });
    }, 500);

    /* =========================
       CUSTOM CURSOR
    ========================= */

    if (cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let ringX = mouseX;
        let ringY = mouseY;

        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        document.querySelectorAll("a, .skill-card, .experience-item").forEach((element) => {

            element.addEventListener("mouseenter", () => {
                cursorRing.classList.add("active");
            });

            element.addEventListener("mouseleave", () => {
                cursorRing.classList.remove("active");
            });

        });
    }

    /* =========================
       SCROLL PROGRESS
    ========================= */

    function updateScroll() {

        const scrollTop = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        if (scrollLine) {
            scrollLine.style.height = `${progress}%`;
        }

        if (header) {
            if (scrollTop > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    }

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    /* =========================
       SCROLL REVEALS
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.nav-menu a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            });

        },
        {
            threshold: 0.25
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

    /* =========================
       SMOOTH ANCHOR LINKS
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

    /* =========================
       HERO PORTRAIT PARALLAX
    ========================= */

    if (
        photoStage &&
        profileImage &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;

        photoStage.addEventListener("mousemove", (event) => {

            const rect = photoStage.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            targetX = x * 18;
            targetY = y * 12;

        });

        photoStage.addEventListener("mouseleave", () => {

            targetX = 0;
            targetY = 0;

        });

        function animatePortrait() {

            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;

            profileImage.style.setProperty(
                "--photo-x",
                `${currentX}px`
            );

            profileImage.style.setProperty(
                "--photo-y",
                `${currentY}px`
            );

            requestAnimationFrame(animatePortrait);
        }

        animatePortrait();
    }

    /* =========================
       MAGNETIC BUTTONS
    ========================= */

    if (window.matchMedia("(pointer: fine)").matches) {

        document.querySelectorAll(".magnetic").forEach((button) => {

            button.addEventListener("mousemove", (event) => {

                const rect = button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.15}px, ${y * 0.15}px)`;

            });

            button.addEventListener("mouseleave", () => {

                button.style.transform = "translate(0, 0)";

            });

        });
    }

    /* =========================
       EXPERIENCE HOVER
    ========================= */

    document.querySelectorAll(".experience-item").forEach((item) => {

        item.addEventListener("mouseenter", () => {
            item.style.setProperty("--hover-x", "8px");
        });

        item.addEventListener("mouseleave", () => {
            item.style.setProperty("--hover-x", "0px");
        });

    });

    /* =========================
       KEYBOARD ESCAPE
    ========================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            document.querySelectorAll(".cursor-ring").forEach((ring) => {
                ring.classList.remove("active");
            });

        }

    });

});
