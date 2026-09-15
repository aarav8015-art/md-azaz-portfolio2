document.addEventListener("DOMContentLoaded", function () {

    const stage = document.getElementById("photoStage");
    const image = document.getElementById("profileImage");

    if (!stage || !image) {
        console.log("Portrait elements not found");
        return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function animatePortrait() {

        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        image.style.transform =
            "translate3d(" +
            currentX +
            "px, " +
            currentY +
            "px, 0) scale(1.04)";

        requestAnimationFrame(animatePortrait);
    }

    animatePortrait();


    /* =========================
       MOUSE / DESKTOP
    ========================= */

    stage.addEventListener("mousemove", function (event) {

        const rect = stage.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        targetX = x * 28;
        targetY = y * 18;

    });


    stage.addEventListener("mouseleave", function () {

        targetX = 0;
        targetY = 0;

    });


    /* =========================
       TOUCH / MOBILE
    ========================= */

    stage.addEventListener(
        "touchmove",
        function (event) {

            const touch = event.touches[0];
            const rect = stage.getBoundingClientRect();

            const x =
                (touch.clientX - rect.left) / rect.width - 0.5;

            const y =
                (touch.clientY - rect.top) / rect.height - 0.5;

            targetX = x * 28;
            targetY = y * 18;

        },
        { passive: true }
    );


    stage.addEventListener("touchend", function () {

        targetX = 0;
        targetY = 0;

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const sections =
        document.querySelectorAll(
            ".content-section, .contact-section"
        );

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    sections.forEach(function (section) {

        section.classList.add("reveal");
        observer.observe(section);

    });

});
