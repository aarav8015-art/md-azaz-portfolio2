document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const body = document.body;
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".scroll-line span");
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const stage = document.querySelector("#photoStage");
  const image = document.querySelector("#profileImage");

  // Page entrance
  setTimeout(() => {
    document.querySelectorAll(".reveal-up").forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, 120 + i * 70);
    });
  }, 450);

  // Custom cursor
  if (dot && ring && matchMedia("(pointer:fine)").matches) {
    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let rx = mx;
    let ry = my;

    addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;

      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });

    const cursorLoop = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;

      ring.style.left = rx + "px";
      ring.style.top = ry + "px";

      requestAnimationFrame(cursorLoop);
    };

    cursorLoop();

    document
      .querySelectorAll("a, .skill-card, .experience-item")
      .forEach((el) => {
        el.addEventListener("mouseenter", () => {
          ring.classList.add("active");
        });

        el.addEventListener("mouseleave", () => {
          ring.classList.remove("active");
        });
      });
  }

  // Scroll progress + header
  const updateScroll = () => {
    const max =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage = max > 0 ? (window.scrollY / max) * 100 : 0;

    if (progress) {
      progress.style.height = percentage + "%";
    }

    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 35);
    }
  };

  window.addEventListener("scroll", updateScroll, {
    passive: true
  });

  updateScroll();

  // Reveal sections when scrolling
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
      rootMargin: "0px 0px -35px 0px"
    }
  );

  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  // Active navigation
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        document
          .querySelectorAll(".nav-menu a")
          .forEach((a) => a.classList.remove("active"));

        const link = document.querySelector(
          `.nav-menu a[href="#${entry.target.id}"]`
        );

        if (link) {
          link.classList.add("active");
        }
      });
    },
    {
      threshold: 0.25
    }
  );

  document
    .querySelectorAll("main section[id]")
    .forEach((section) => sectionObserver.observe(section));

  // Smooth navigation
  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = document.querySelector(
          link.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });

  // Portrait mouse movement
  if (
    stage &&
    image &&
    matchMedia("(pointer:fine)").matches
  ) {
    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    stage.addEventListener("mousemove", (e) => {
      const rect = stage.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) / rect.width - 0.5;

      const y =
        (e.clientY - rect.top) / rect.height - 0.5;

      targetX = x * 10;
      targetY = y * 7;
    });

    stage.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
    });

    const photoLoop = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      image.style.setProperty(
        "--photo-x",
        currentX + "px"
      );

      image.style.setProperty(
        "--photo-y",
        currentY + "px"
      );

      requestAnimationFrame(photoLoop);
    };

    photoLoop();
  }

  // Magnetic buttons
  if (matchMedia("(pointer:fine)").matches) {
    document
      .querySelectorAll(".magnetic")
      .forEach((element) => {
        element.addEventListener("mousemove", (e) => {
          const rect =
            element.getBoundingClientRect();

          const x =
            e.clientX -
            rect.left -
            rect.width / 2;

          const y =
            e.clientY -
            rect.top -
            rect.height / 2;

          element.style.transform =
            `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        element.addEventListener("mouseleave", () => {
          element.style.transform =
            "translate(0, 0)";
        });
      });
  }
});
