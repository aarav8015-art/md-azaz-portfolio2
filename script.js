document.addEventListener("DOMContentLoaded", () => {

    const stage = document.getElementById("photoStage");
    const image = document.getElementById("profileImage");

    if (!stage || !image) return;

    let targetRotateX = 0;
    let targetRotateY = 0;
    let targetMoveX = 0;
    let targetMoveY = 0;

    let rotateX = 0;
    let rotateY = 0;
    let moveX = 0;
    let moveY = 0;

    /* Smooth animation loop */
    function animate() {

        rotateX += (targetRotateX - rotateX) * 0.07;
        rotateY += (targetRotateY - rotateY) * 0.07;

        moveX += (targetMoveX - moveX) * 0.07;
        moveY += (targetMoveY - moveY) * 0.07;

        image.style.transform = `
            translate3d(${moveX}px, ${moveY}px, 0)
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.035)
        `;

        requestAnimationFrame(animate);
    }

    animate();


    /* Desktop mouse interaction */

    stage.addEventListener("mousemove", (event) => {

        const rect = stage.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        targetRotateY = x * 7;
        targetRotateX = -y * 5;

        targetMoveX = x * 12;
        targetMoveY = y * 8;

    });


    /* Smooth return when mouse leaves */

    stage.addEventListener("mouseleave", () => {

        targetRotateX = 0;
        targetRotateY = 0;
        targetMoveX = 0;
        targetMoveY = 0;

    });


    /* Mobile touch interaction */

    stage.addEventListener(
        "touchmove",
        (event) => {

            const touch = event.touches[0];
            const rect = stage.getBoundingClientRect();

            const x =
                (touch.clientX - rect.left) / rect.width - 0.5;

            const y =
                (touch.clientY - rect.top) / rect.height - 0.5;

            targetRotateY = x * 6;
            targetRotateX = -y * 4;

            targetMoveX = x * 10;
            targetMoveY = y * 6;

        },
        { passive: true }
    );


    stage.addEventListener("touchend", () => {

        targetRotateX = 0;
        targetRotateY = 0;
        targetMoveX = 0;
        targetMoveY = 0;

    });


    /* Scroll reveal */

    const sections = document.querySelectorAll(
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

    sections.forEach((section) => {
        section.classList.add("reveal");
        observer.observe(section);
    });

});
