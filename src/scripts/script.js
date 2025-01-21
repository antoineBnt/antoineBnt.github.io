import gsap from "gsap";

// -------------------CIBLER L'image du menu burger------------------------

// -------------------ANIMATION DE LA FLEUR ET DE L'ENGRENAGE-----------

document.addEventListener("DOMContentLoaded", () => {
  let imgs = document.querySelectorAll(".header__img");
  let gear = imgs[0];
  let flower = imgs[1];
  let gearDirection = 1;
  let flowerDirection = 1;

  function animateGear() {
    if (gear) {
      gsap.to(gear, {
        rotation: `+=${360 * gearDirection}`,
        duration: 4,
        ease: "none",
        onComplete: function () {
          gearDirection *= -1;
          setTimeout(animateGear, 1000);
        },
      });
    }
  }

  function animateFlower() {
    if (flower) {
      gsap.to(flower, {
        rotation: `+=${360 * flowerDirection}`,
        duration: 4,
        ease: "none",
        onComplete: function () {
          flowerDirection *= -1;
          pulsateFlower();
        },
      });
    }
  }

  function pulsateFlower() {
    if (flower) {
      gsap.to(flower, {
        scale: 1.1,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        onComplete: function () {
          setTimeout(animateFlower, 1000);
        },
      });
    }
  }

  animateGear();
  setTimeout(animateFlower, 2000);
});

// -----------------------------------------MENU BURGER-----------------------

document.addEventListener("DOMContentLoaded", () => {
  function toggleMenu() {
    const menu = document.querySelector(".menu-fullscreen");
    if (menu) {
      const isMenuOpen = menu.style.left === "0px";
      menu.style.left = isMenuOpen ? "-100vw" : "0px";
    } else {
      console.warn("L'élément .menu-fullscreen est introuvable.");
    }
  }
  function setupMenuLinks() {
    const links = document.querySelectorAll(".burger__ancre");

    links.forEach((link) => {
      link.addEventListener("click", () => {
        const menu = document.querySelector(".menu-fullscreen");
        if (menu) {
          menu.style.left = "-100vw";
        } else {
          console.warn("L'élément .menu-fullscreen est introuvable.");
        }
      });
    });
  }

  setupMenuLinks();

  window.toggleMenu = toggleMenu;
});

// -------------------------ANIMATION DES ANCRES DU MENU BURGER---------------

const burgerLinks = document.querySelectorAll(".burger__ancre");

burgerLinks.forEach((link) => {
  link.addEventListener("mouseover", function () {
    burgerLinks.forEach((innerLink) => {
      innerLink.style.opacity = "0.5";
      innerLink.style.transform = "scale(1)";
      innerLink.style.margin = "0";
    });

    this.style.opacity = "1";
    this.style.transform = "scale(1.2)";
    this.style.margin = "30px 0";
  });

  link.addEventListener("mouseout", function () {
    burgerLinks.forEach((innerLink) => {
      innerLink.style.opacity = "1";
      innerLink.style.transform = "scale(1)";
      innerLink.style.margin = "0";
    });
  });
});

// ---------------------PARALLAX HORIZONTALE DROITE-----------------

document.addEventListener("scroll", function () {
  const element = document.querySelector(".head");
  if (element) {
    const rect = element.getBoundingClientRect();

    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const percentageVisible = visibleHeight / element.clientHeight;

      const opacity = percentageVisible;

      element.style.opacity = opacity;

      const translateX = (1 - opacity) * 1200;
      element.style.transform = `translateX(${translateX}px)`;
    }
  }
});

// ---------------ANIMATION ENTRANCE LEFT & RIGHT----------------

function handleParallax(sectionSelector) {
  const section = document.querySelector(sectionSelector);
  if (section) {
    document.addEventListener("scroll", function () {
      const rect = section.getBoundingClientRect();
      const height =
        window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= height / 2 && rect.bottom >= height / 2) {
        section.classList.add("parallax-active");
      } else {
        section.classList.remove("parallax-active");
      }
    });
  }
}

handleParallax(".head");
handleParallax(".about");
handleParallax(".skills");
handleParallax(".level");

// -----------------CAROUSEL---------------------

function setupCarousel() {
  const navItems = document.querySelectorAll("ul li");
  const contents = document.querySelectorAll(".content");

  const defaultContent = document.querySelector(".default");
  if (defaultContent) {
    defaultContent.style.display = "block";
  }

  navItems.forEach((item) => {
    item.addEventListener("mouseover", function () {
      const contentId = this.getAttribute("data-content");
      contents.forEach((content) => {
        content.style.display = content.id === contentId ? "block" : "none";
      });
    });
  });
}

setupCarousel();

// ------------------ANIMATION IMAGE SKILLS-----------------

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("isVisible", entry.isIntersecting);
    });
  },
  {
    threshold: 0.1,
  },
);

document.querySelectorAll(".inte__img").forEach((image) => {
  observer.observe(image);
});

// ---------------------LEVEL BAR--------------------

const levelObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const skillBar = entry.target;
      if (entry.isIntersecting) {
        skillBar.style.width = skillBar.getAttribute("data-percentage") + "%";
      } else {
        skillBar.style.width = "0%";
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".level-percentage").forEach((level) => {
  levelObserver.observe(level);
});

// --------------------SCROLL BUTTON CHANGE-------------

let scrollDownButton = document.getElementById("scrollDownButton");
let scrollUpButton = document.getElementById("scrollUpButton");

function showScrollUpButton() {
  if (scrollDownButton) scrollDownButton.style.display = "none";
  if (scrollUpButton) scrollUpButton.style.display = "block";
}

function showScrollDownButton() {
  if (scrollDownButton) scrollDownButton.style.display = "block";
  if (scrollUpButton) scrollUpButton.style.display = "none";
}

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 20) {
    showScrollUpButton();
  } else {
    showScrollDownButton();
  }
});

if (scrollUpButton) {
  scrollUpButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ------------------AJUSTEMENT FOND DE COULEUR SCROLL-------------------

const scrollBtn = document.querySelector(".mouse-btn-1");

if (scrollBtn) {
  scrollBtn.style.display = "block";

  window.addEventListener("scroll", function () {
    scrollBtn.style.display = window.pageYOffset === 0 ? "block" : "none";
  });
}

// ------------------LOADER-----------------

// Ajouter la classe no-scroll pour bloquer le défilement
document.body.classList.add("no-scroll");

var loader = document.querySelector(".loader");

if (loader) {
  // Animer le loader avec GSAP
  gsap.to(loader, {
    opacity: 0,
    duration: 1,
    delay: 4, // Temps avant de commencer à cacher le loader
    onComplete: function () {
      loader.style.display = "none";
      document.body.classList.remove("no-scroll");
    },
  });
} else {
  // Si pas de loader, retirer la classe no-scroll immédiatement
  document.body.classList.remove("no-scroll");
}

// ------------------PITCH APPARITION-----------------

document.addEventListener("DOMContentLoaded", function () {
  var observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("pitch__title-visible");
        } else {
          entry.target.classList.remove("pitch__title-visible");
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.6,
    },
  );
  var element = document.getElementById("pitch__JS");
  observer.observe(element);
});

// -----------------------TEXT WRITTING--------------------------------

const output = document.getElementById("typed-output");
const words = ["WEBDESIGNER", "UI/UX", "INTEGRATEUR", "INFOGRAPHISTE"];
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    if (letterIndex >= Math.floor(currentWord.length / 2)) {
      const firstHalf = currentWord.substring(
        0,
        Math.floor(currentWord.length / 2),
      );
      const secondHalf = currentWord.substring(
        Math.floor(currentWord.length / 2),
        letterIndex,
      );
      output.innerHTML =
        firstHalf + '<span class="bold">' + secondHalf + "</span>";
    } else {
      output.textContent = currentWord.substring(0, letterIndex);
    }

    letterIndex--;

    if (letterIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 1000);
      return;
    }
  } else {
    if (letterIndex <= Math.floor(currentWord.length / 2)) {
      output.textContent = currentWord.substring(0, letterIndex);
    } else {
      const firstHalf = currentWord.substring(
        0,
        Math.floor(currentWord.length / 2),
      );
      const secondHalf = currentWord.substring(
        Math.floor(currentWord.length / 2),
        letterIndex,
      );
      output.innerHTML =
        firstHalf + '<span class="bold">' + secondHalf + "</span>";
    }

    letterIndex++;

    if (letterIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }
  }

  const typingSpeed = isDeleting ? 100 : 200;
  setTimeout(type, typingSpeed);
}

type();

// ------------------ANIMATION SVG-----------------

window.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("classic, immersif");

  if (page) {
    page.classList.add("visible");
    console.log("Script exécuté : l'élément 'classic' est trouvé.");
  } else {
    console.log("Script ignoré : l'élément 'classic' est introuvable.");
  }
});

// ------------------ANIMATION ABOUT RANDOM-----------------
document.addEventListener("DOMContentLoaded", () => {
  const spans = document.querySelectorAll(
    ".span__about-text, .info__title-span, .title__span, .pitch__title-span, .write__text, .level-percentage",
  );

  const colors = ["#f8df64", "#a1ade7"];
  const totalSpans = spans.length;

  const halfCount = Math.floor(totalSpans / 2);

  const colorAssignments = [];
  for (let i = 0; i < halfCount; i++) {
    colorAssignments.push(colors[0]);
  }
  for (let i = halfCount; i < totalSpans; i++) {
    colorAssignments.push(colors[1]);
  }

  colorAssignments.sort(() => Math.random() - 0.5);

  spans.forEach((span, index) => {
    const assignedColor = colorAssignments[index];
    span.style.setProperty("--before-color", assignedColor);
  });
});

//----------------
document.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("classic");
  page.style.opacity = "1";
  page.style.transform = "scale(1)";
});

// ---------------- IMMERSIF ------------


    
