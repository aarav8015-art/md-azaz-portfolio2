document.addEventListener("DOMContentLoaded", () => {

    const stage = document.getElementById("photoStage");
    const image = document.getElementById("profileImage");

    if (!stage || !image) return;

    let dragging = false;
    let startX = 0;
    let startPosition = 50;
    let currentPosition = 50;
    let targetPosition = 50;

    let lastX = 0;
    let velocity = 0;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function updateImage() {

        currentPosition +=
            (targetPosition - currentPosition) * 0.12;

        image.style.objectPosition =
            `${currentPosition}% 48%`;

        requestAnimationFrame(updateImage);
    }

    updateImage();


    /* =========================
       MOUSE
    ========================= */

    stage.addEventListener("pointerdown", (event) => {

        dragging = true;

        startX = event.clientX;
        lastX = event.clientX;

        startPosition = currentPosition;

        stage.setPointerCapture(event.pointerId);

        stage.style.cursor = "grabbing";

        image.style.transition = "none";
    });


    stage.addEventListener("pointermove", (event) => {

        if (!dragging) return;

        const movement = event.clientX - startX;

        const sensitivity = 0.12;

        targetPosition =
            clamp(
                startPosition - movement * sensitivity,
                0,
                100
            );

        velocity = event.clientX - lastX;

        lastX = event.clientX;
    });


    function stopDragging() {

        if (!dragging) return;

        dragging = false;

        stage.style.cursor = "grab";

        image.style.transition =
            "transform 0.45s ease-out";

        /* Small momentum after release */

        targetPosition =
            clamp(
                targetPosition - velocity * 0.8,
                0,
                100
            );
    }


    stage.addEventListener("pointerup", stopDragging);
    stage.addEventListener("pointercancel", stopDragging);
    stage.addEventListener("lostpointercapture", stopDragging);


    /* =========================
       TOUCH / MOBILE
    ========================= */

    stage.addEventListener(
        "touchstart",
        (event) => {

            startX = event.touches[0].clientX;
            startPosition = currentPosition;

            dragging = true;
        },
        { passive: true }
    );


    stage.addEventListener(
        "touchmove",
        (event) => {

            if (!dragging) return;

            const x = event.touches[0].clientX;

            const movement = x - startX;

            targetPosition =
                clamp(
                    startPosition - movement * 0.12,
                    0,
                    100
                );
        },
        { passive: true }
    );


    stage.addEventListener(
        "touchend",
        () => {

            dragging = false;

        },
        { passive: true }
    );


    /* =========================
       MOUSE CURSOR
    ========================= */

    stage.style.cursor = "grab";


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

                        entry.target.classList.add(
                            "visible"
                        );

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
