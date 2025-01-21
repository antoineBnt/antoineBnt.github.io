//-----------------------------------------------------------------ANIM SVG -----------------------------------------------------------------
import anime from "animejs/lib/anime.es.js";

const svgList = [
  // Exemple 1
  `<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.42 12.71">
    <path class="picto__none" d="M.5,12.71C.5,5.97,5.97.5,12.71.5s12.21,5.47,12.21,12.21" fill="none" stroke="#f2e6aa" stroke-width="0.6"/>
  </svg>`,
  // Exemple 2
  `<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.63 22.63">
    <rect class="picto__none" x=".5" y=".5" width="21.63" height="21.63" fill="none" stroke="#b0b8e4" stroke-width="0.6"/>
  </svg>`,
  // Exemple 3
  `<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.42 25.42">
    <circle class="picto__none" cx="12.71" cy="12.71" r="12.21" fill="none" stroke="#f2e6aa" stroke-width="0.6"/>
  </svg>`,
  // Exemple 4
  `<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.29 26.69">
    <path class="picto__none" d="M21.58,16.68c1.37.94,2.26,2.51,2.26,4.3,0,2.88-2.33,5.21-5.21,5.21-2.23,0-4.13-1.4-4.87-3.37-.79,1.88-2.64,3.19-4.8,3.19-2.88,0-5.21-2.33-5.21-5.21,0-1.67.79-3.17,2.02-4.12h-.05c-2.88,0-5.21-2.33-5.21-5.21s2.33-5.21,5.21-5.21c1.09,0,2.1.33,2.93.9-.14-.46-.21-.95-.21-1.45,0-2.88,2.33-5.21,5.21-5.21s5.21,2.33,5.21,5.21c0,.5-.07.99-.21,1.45.84-.57,1.84-.9,2.93-.9,2.87,0,5.21,2.34,5.21,5.21s-2.34,5.21-5.21,5.21Z" fill="none" stroke="#b0b8e4" stroke-width="0.6"/>
  </svg>`,
  // Exemple 5
  `<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.77 25.82">
    <path class="picto__none" d="M26.27,19.11c0,1.71-.7,3.26-1.82,4.39s-2.67,1.82-4.39,1.82H6.7c-3.43,0-6.2-2.78-6.2-6.2,0-1.71.7-3.26,1.82-4.39,1.12-1.12,2.67-1.82,4.39-1.82-3.43,0-6.2-2.78-6.2-6.2,0-1.71.7-3.26,1.82-4.39,1.12-1.12,2.67-1.82,4.39-1.82h13.36c3.42,0,6.2,2.78,6.2,6.2,0,1.71-.7,3.26-1.82,4.39-1.12,1.12-2.67,1.82-4.39,1.82,3.42,0,6.2,2.78,6.2,6.2Z" fill="none" stroke="#f2e6aa" stroke-width="0.6"/>
  </svg>`,
  // Exemple 6
  `<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.42 13.21">
    <path class="picto__none" d="M.5,12.71C.5,5.97,5.97.5,12.71.5s12.21,5.47,12.21,12.21H.5Z" fill="none" stroke="#b0b8e4" stroke-width="0.6"/>
  </svg>`,
  // Exemple 7
  `<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.65 27.83">
    <path class="picto__none" d="M29.15,19.81c0,4.16-3.37,7.52-7.52,7.52-3.01,0-5.61-1.77-6.8-4.32-1.2,2.55-3.8,4.32-6.81,4.32-4.15,0-7.52-3.36-7.52-7.52s3.37-7.52,7.52-7.52c.21,0,.42,0,.63.03-.85-1.21-1.35-2.7-1.35-4.29C7.3,3.87,10.67.5,14.82.5s7.53,3.37,7.53,7.52c0,1.6-.5,3.08-1.35,4.29.21-.02.42-.03.63-.03,4.15,0,7.52,3.37,7.52,7.52Z" fill="none" stroke="#f2e6aa" stroke-width="0.6"/>
  </svg>`,
  // Exemple 8
  `<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.42 13.21">
    <path class="picto__none" d="M.5,12.71C.5,5.97,5.97.5,12.71.5s12.21,5.47,12.21,12.21H.5Z" fill="none" stroke="#b0b8e4" stroke-width="0.6"/>
  </svg>`,
];

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    launchDisperseAnimation();
  }, 1200);
});

function launchDisperseAnimation() {
  const leftSection = document.getElementById("picto");
  const numberOfDesigns = Math.floor(Math.random() * 34) + 1;

  const designs = createRandomDesigns(leftSection, numberOfDesigns);

  animateDesignsFromCenter(designs, leftSection);

  animateDesignsStrokeInfinity(designs);
}

function createRandomDesigns(parent, count) {
  const createdDesigns = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * svgList.length);
    const randomSVG = svgList[randomIndex];

    const container = document.createElement("div");
    container.classList.add("design");
    container.innerHTML = randomSVG;

    container.style.position = "absolute";
    container.style.zIndex = "1";
    container.style.left = "50%";
    container.style.top = "50%";

    parent.insertBefore(container, parent.firstChild);

    createdDesigns.push(container);
  }
  return createdDesigns;
}

function animateDesignsFromCenter(designs, parent) {
  const existingPositions = [];
  const minDistance = 12;

  designs.forEach((design, i) => {
    let finalX, finalY;
    let attempts = 0;
    let isTooClose;

    do {
      finalX = Math.random() * 80 + 10;
      finalY = Math.random() * 80 + 10;
      isTooClose = existingPositions.some((pos) => {
        const dx = finalX - pos.x;
        const dy = finalY - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < minDistance;
      });

      attempts++;
    } while (isTooClose && attempts < 30);

    existingPositions.push({ x: finalX, y: finalY });

    anime({
      targets: design,
      left: `${finalX}%`,
      top: `${finalY}%`,
      duration: 1200,
      delay: i * 150,
      easing: "easeOutBack",
    });
  });
}

function animateDesignsStrokeInfinity(designs) {
  designs.forEach((design) => {
    const svgElement = design.querySelector("svg");
    if (!svgElement) return;
    const allPaths = svgElement.querySelectorAll(
      "path, circle, line, polygon, ellipse, rect",
    );

    allPaths.forEach((shape) => {
      const offset = anime.setDashoffset(shape);
      shape.setAttribute("stroke-dasharray", offset);
      shape.setAttribute("stroke-dashoffset", offset);

      anime({
        targets: shape,
        strokeDashoffset: [offset, 0],
        duration: 5000,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
      });
    });
  });
}
