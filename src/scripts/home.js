import anime from "animejs/lib/anime.es.js";

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------ANIMATION SECTION GAUCHE------------------------

  const leftSection = document.getElementById("left-section");
  const leftStrokeElements = leftSection.querySelectorAll(
    ".home__svg .cls-1, .home__svg .cls-2",
  );
  const leftFilledShapes = leftSection.querySelectorAll(
    ".home__svg .filled-shape",
  );

  function initializeLeftElements() {
    leftStrokeElements.forEach((element) => {
      const offset = anime.setDashoffset(element);
      element.setAttribute("stroke-dasharray", offset);
      element.setAttribute("stroke-dashoffset", offset);
    });

    const leftFilledShapes = Array.from(
      document.querySelectorAll(".filled-shape"),
    );

    leftFilledShapes.forEach((shape) => {
      shape.style.opacity = "0";
    });
  }

  initializeLeftElements();

  let isLeftAnimating = false;

  const animateLeftSVG = () => {
    if (isLeftAnimating) return;
    isLeftAnimating = true;

    initializeLeftElements();

    anime
      .timeline({
        easing: "linear",
        duration: 1500,
        complete: () => {
          isLeftAnimating = false;
        },
      })
      .add({
        targets: leftStrokeElements,
        strokeDashoffset: [anime.setDashoffset, 0],
        delay: function (el, i) {
          return i * 250;
        },
      })
      .add(
        {
          targets: leftFilledShapes,
          opacity: [0, 1],
          delay: function (el, i) {
            return i * 250;
          },
        },
        0,
      );
  };

  leftSection.addEventListener("mouseenter", animateLeftSVG);

  // ------------------------ANIMATION SECTION DROITE------------------------

  const rightSection = document.getElementById("right-section");
  const rightStrokeElements = rightSection.querySelectorAll(
    ".home__svg .cls-3, .home__svg .cls-4",
  );
  const rightFilledShapes = rightSection.querySelectorAll(
    ".home__svg .filled-shape",
  );

  function initializeRightElements() {
    rightStrokeElements.forEach((element) => {
      const offset = anime.setDashoffset(element);
      element.setAttribute("stroke-dasharray", offset);
      element.setAttribute("stroke-dashoffset", offset);
    });

    const rightFilledShapes = Array.from(
      document.querySelectorAll(".filled-shape"),
    );

    rightFilledShapes.forEach((shape) => {
      shape.style.opacity = "0";
    });
  }

  initializeRightElements();

  let isRightAnimating = false;

  const animateRightSVG = () => {
    if (isRightAnimating) return;
    isRightAnimating = true;

    initializeRightElements();

    anime
      .timeline({
        easing: "linear",
        duration: 1500,
        complete: () => {
          isRightAnimating = false;
        },
      })
      .add({
        targets: rightStrokeElements,
        strokeDashoffset: [anime.setDashoffset, 0],
        delay: function (el, i) {
          return i * 250;
        },
      })
      .add(
        {
          targets: rightFilledShapes,
          opacity: [0, 1],
          delay: function (el, i) {
            return i * 250;
          },
        },
        0,
      );
  };

  rightSection.addEventListener("mouseenter", animateRightSVG);
});

// ------------------------ANIM ZOOM------------------------
import barba from "@barba/core";
import gsap from "gsap";
barba.init({
  transitions: [
    {
      name: "fade-transition",
      leave(data) {
        const done = this.async();

        gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5,
          translateX: 200,
          scale: 1.5,
          ease: "power1.inOut",
          onComplete: done,
        });
      },
      afterLeave() {
        gsap.set("body", {
          backgroundColor: "white",
        });
      },
      enter(data) {
        gsap.set(data.next.container, {
          opacity: 0,
        });

        gsap.to(data.next.container, {
          opacity: 1,
          duration: 0.5,
          scale: 1.5,
          ease: "power1.inOut",
        });
      },
    },
  ],
});
