document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const stage =
        document.getElementById("photoStage");

    const image =
        document.getElementById("profileImage");

    const header =
        document.querySelector(".site-header");

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const loader =
        document.createElement("div");

    loader.className = "page-loader";

    body.prepend(loader);


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progress =
        document.createElement("div");

    progress.className =
        "scroll-progress";

    body.appendChild(progress);


    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight
            - window.innerHeight;

        const percentage =
            scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;
    }


    /* =====================================================
       HEADER SCROLL STATE
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }


    /* =====================================================
       MOUSE CURSOR
    ===================================================== */

    const dot =
        document.createElement("div");

    dot.className =
        "cursor-dot";

    const ring =
        document.createElement("div");

    ring.className =
        "cursor-ring";

    body.appendChild(dot);
    body.appendChild(ring);

    let cursorX = 0;
    let cursorY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener(
        "mousemove",
        (event) => {

            cursorX =
                event.clientX;

            cursorY =
                event.clientY;

            dot.style.left =
                `${cursorX}px`;

            dot.style.top =
                `${cursorY}px`;
        }
    );


    function animateCursor() {

        ringX +=
            (cursorX - ringX) * 0.12;

        ringY +=
            (cursorY - ringY) * 0.12;

        ring.style.left =
            `${ringX}px`;

        ring.style.top =
            `${ringY}px`;

        requestAnimationFrame(
            animateCursor
        );
    }

    animateCursor();


    /* =====================================================
       CURSOR HOVER EFFECT
    ===================================================== */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .skill-card, .experience-item, .education-item"
        );

    interactiveElements.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {
                    body.classList.add(
                        "cursor-hover"
                    );
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    body.classList.remove(
                        "cursor-hover"
                    );
                }
            );

        }
    );


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    if (stage && image) {

        let targetRotateX = 0;
        let targetRotateY = 0;

        let targetMoveX = 0;
        let targetMoveY = 0;

        let currentRotateX = 0;
        let currentRotateY = 0;

        let currentMoveX = 0;
        let currentMoveY = 0;


        function animatePortrait() {

            currentRotateX +=
                (targetRotateX - currentRotateX)
                * 0.055;

            currentRotateY +=
                (targetRotateY - currentRotateY)
                * 0.055;

            currentMoveX +=
                (targetMoveX - currentMoveX)
                * 0.055;

            currentMoveY +=
                (targetMoveY - currentMoveY)
                * 0.055;


            image.style.transform = `
                translate3d(
                    ${currentMoveX}px,
                    ${currentMoveY}px,
                    0
                )
                rotateX(
                    ${currentRotateX}deg
                )
                rotateY(
                    ${currentRotateY}deg
                )
                scale(1.035)
            `;


            requestAnimationFrame(
                animatePortrait
            );
        }


        animatePortrait();


        stage.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    stage.getBoundingClientRect();

                const x =
                    (
                        event.clientX
                        - rect.left
                    ) / rect.width - .5;

                const y =
                    (
                        event.clientY
                        - rect.top
                    ) / rect.height - .5;


                targetRotateY =
                    x * 5;

                targetRotateX =
                    -y * 3.5;

                targetMoveX =
                    x * 14;

                targetMoveY =
                    y * 9;

            }
        );


        stage.addEventListener(
            "mouseleave",
            () => {

                targetRotateX = 0;
                targetRotateY = 0;

                targetMoveX = 0;
                targetMoveY = 0;
            }
        );


        /* Mobile touch */

        stage.addEventListener(
            "touchmove",
            (event) => {

                const touch =
                    event.touches[0];

                const rect =
                    stage.getBoundingClientRect();

                const x =
                    (
                        touch.clientX
                        - rect.left
                    ) / rect.width - .5;

                const y =
                    (
                        touch.clientY
                        - rect.top
                    ) / rect.height - .5;


                targetRotateY =
                    x * 4;

                targetRotateX =
                    -y * 3;

                targetMoveX =
                    x * 10;

                targetMoveY =
                    y * 7;
            },
            { passive: true }
        );


        stage.addEventListener(
            "touchend",
            () => {

                targetRotateX = 0;
                targetRotateY = 0;

                targetMoveX = 0;
                targetMoveY = 0;
            }
        );
    }


    /* =====================================================
       SCROLL REVEALS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".content-section, .contact-section"
        );


    revealElements.forEach(
        (element) => {

            element.classList.add(
                "reveal"
            );
        }
    );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            const children =
                                entry.target.querySelectorAll(
                                    ".about-item, .experience-item, .skill-card, .education-item"
                                );


                            children.forEach(
                                (child, index) => {

                                    child.style.transitionDelay =
                                        `${index * 70}ms`;
                                }
                            );
                        }

                    }
                );

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );
        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;

                            navLinks.forEach(
                                (link) => {

                                    link.classList.remove(
                                        "active"
                                    );

                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) === `#${id}`
                                    ) {

                                        link.classList.add(
                                            "active"
                                        );
                                    }

                                }
                            );
                        }

                    }
                );

            },
            {
                rootMargin:
                    "-40% 0px -50% 0px"
            }
        );


    sections.forEach(
        (section) => {

            navObserver.observe(
                section
            );
        }
    );


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magnetic =
        document.querySelectorAll(
            ".primary-btn, .contact-button, .nav-cv"
        );


    magnetic.forEach(
        (button) => {

            button.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX
                        - rect.left
                        - rect.width / 2;

                    const y =
                        event.clientY
                        - rect.top
                        - rect.height / 2;


                    button.style.transform =
                        `translate(
                            ${x * .12}px,
                            ${y * .12}px
                        )`;
                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";
                }
            );

        }
    );


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    const offset =
                        header
                            ? header.offsetHeight
                            : 0;

                    const position =
                        target.getBoundingClientRect()
                            .top
                        + window.scrollY
                        - offset;


                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                }
            );

        }
    );


    /* =====================================================
       SCROLL PARALLAX
    ===================================================== */

    let ticking = false;

    function updateScrollEffects() {

        updateScrollProgress();
        updateHeader();

        const scroll =
            window.scrollY;

        document.documentElement.style
            .setProperty(
                "--scroll-y",
                `${scroll * -.03}px`
            );

        ticking = false;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateScrollEffects
                );

                ticking = true;
            }
        },
        { passive: true }
    );


    updateScrollEffects();


    /* =====================================================
       CARD TILT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".skill-card, .education-item"
        );


    cards.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        (
                            event.clientX
                            - rect.left
                        ) / rect.width - .5;

                    const y =
                        (
                            event.clientY
                            - rect.top
                        ) / rect.height - .5;


                    card.style.transform =
                        `
                        perspective(700px)
                        rotateX(${-y * 2.5}deg)
                        rotateY(${x * 2.5}deg)
                        translateY(-5px)
                        `;
                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";
                }
            );

        }
    );


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

        }
    );

});
