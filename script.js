/* ============================================
   MD AZAZ PORTFOLIO
   INTERACTIVE HERO IMAGE
   Mouse + Touch Drag
   ============================================ */

const photoStage = document.getElementById("photoStage");
const profileImage = document.getElementById("profileImage");

let isDragging = false;

let startX = 0;
let currentRotation = 0;
let targetRotation = 0;

let velocity = 0;
let lastX = 0;


/* ============================================
   MOUSE
   ============================================ */

photoStage.addEventListener("mousedown", (event) => {

    isDragging = true;

    startX = event.clientX;
    lastX = event.clientX;

    velocity = 0;

    photoStage.style.cursor = "grabbing";

});


window.addEventListener("mousemove", (event) => {

    if (!isDragging) return;

    const x = event.clientX;

    const movement = x - lastX;

    targetRotation += movement * 0.45;

    velocity = movement * 0.45;

    lastX = x;

});


window.addEventListener("mouseup", () => {

    if (!isDragging) return;

    isDragging = false;

    photoStage.style.cursor = "grab";

});


/* ============================================
   TOUCH
   ============================================ */

photoStage.addEventListener(
    "touchstart",
    (event) => {

        isDragging = true;

        startX = event.touches[0].clientX;

        lastX = startX;

        velocity = 0;

    },
    { passive: true }
);


photoStage.addEventListener(
    "touchmove",
    (event) => {

        if (!isDragging) return;

        const x = event.touches[0].clientX;

        const movement = x - lastX;

        targetRotation += movement * 0.5;

        velocity = movement * 0.5;

        lastX = x;

    },
    { passive: true }
);


photoStage.addEventListener(
    "touchend",
    () => {

        isDragging = false;

    },
    { passive: true }
);


/* ============================================
   ANIMATION LOOP
   ============================================ */

function animate() {

    /*
       Add momentum after releasing mouse/finger.
    */

    if (!isDragging) {

        targetRotation += velocity;

        velocity *= 0.92;

    }


    /*
       Smoothly catch up to the target rotation.
    */

    currentRotation +=
        (targetRotation - currentRotation) * 0.12;


    /*
       Keep the rotation within reasonable limits.
    */

    targetRotation = Math.max(
        -55,
        Math.min(55, targetRotation)
    );


    /*
       Apply 3D rotation.
    */

    profileImage.style.transform =
        `perspective(1000px)
         rotateY(${currentRotation}deg)
         rotateX(${Math.sin(currentRotation * 0.03) * 2}deg)
         scale(${1 + Math.abs(currentRotation) * 0.0015})`;


    /*
       Add subtle movement to the stage.
    */

    photoStage.style.transform =
        `translateZ(0px)`;


    requestAnimationFrame(animate);

}

animate();


/* ============================================
   SCROLL REVEAL
   ============================================ */

const sections =
    document.querySelectorAll(".section");


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
            threshold: 0.15
        }
    );


sections.forEach((section) => {

    observer.observe(section);

});


/* ============================================
   HIDE DRAG HINT AFTER FIRST INTERACTION
   ============================================ */

const dragHint =
    document.querySelector(".drag-hint");

let interacted = false;


function hideHint() {

    if (interacted) return;

    interacted = true;

    if (dragHint) {

        dragHint.style.opacity = "0";

        dragHint.style.transition =
            "opacity 0.5s ease";

    }

}


photoStage.addEventListener(
    "mousedown",
    hideHint
);

photoStage.addEventListener(
    "touchstart",
    hideHint
);
