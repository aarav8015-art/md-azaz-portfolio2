console.log("AZAZ PORTFOLIO JS LOADED");
document.addEventListener("DOMContentLoaded", () => {

    const stage = document.getElementById("photoStage");
    const image = document.getElementById("profileImage");

    if (!stage || !image) return;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    function animate() {

        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        image.style.transform = `
            translate3d(${currentX}px, ${currentY}px, 0)
            scale(1.035)
        `;

        requestAnimationFrame(animate);
    }

    animate();


    /* =========================
       MOUSE MOVEMENT
    ========================= */

    document.addEventListener("DOMContentLoaded", () => {

    const stage = document.getElementById("photoStage");
    const image = document.getElementById("profileImage");

    if (!stage || !image) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    function animate() {

        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

        image.style.transform =
            `translate(${currentX}px, ${currentY}px) scale(1.04)`;

        requestAnimationFrame(animate);
    }

    stage.addEventListener("mousemove", (e) => {

        const rect = stage.getBoundingClientRect();

        mouseX =
            ((e.clientX - rect.left) / rect.width - 0.5) * 30;

        mouseY =
            ((e.clientY - rect.top) / rect.height - 0.5) * 20;

    });

    stage.addEventListener("mouseleave", () => {

        mouseX = 0;
        mouseY = 0;

    });

    animate();


    /* Scroll reveal */

    const elements = document.querySelectorAll(
        ".content-section, .contact-section"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }

            });

        },
        { threshold: 0.12 }
    );

    elements.forEach((element) => {

        element.classList.add("reveal");
        observer.observe(element);

    });

});

        const rect = stage.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        targetX = x * 18;
        targetY = y * 10;
    });


    /* =========================
       MOUSE LEAVES PORTRAIT
    ========================= */

    stage.addEventListener("mouseleave", () => {

        targetX = 0;
        targetY = 0;

    });


    /* =========================
       TOUCH MOVEMENT
    ========================= */

    stage.addEventListener(
        "touchmove",
        (event) => {

            const touch = event.touches[0];
            const rect = stage.getBoundingClientRect();

            const x =
                (touch.clientX - rect.left) / rect.width - 0.5;

            const y =
                (touch.clientY - rect.top) / rect.height - 0.5;

            targetX = x * 18;
            targetY = y * 10;

        },
        { passive: true }
    );


    stage.addEventListener("touchend", () => {

        targetX = 0;
        targetY = 0;

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".content-section, .contact-section"
        );

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach((element) => {

        element.classList.add("reveal");
        observer.observe(element);

    });

});


