import { Draw } from "./Draw.js";
import { SVGDownloadHandler } from "./Buttons.js";

import { PatternElement } from "./Pattern/PatternElement.js";
import { WomenFrontBodice } from "./Pattern/Women Pattern/WomenFrontBodice.js";
import { WomenBackBodice } from "./Pattern/Women Pattern/WomenBackBodice.js";
import { WomenSleevePattern } from "./Pattern/Women Pattern/WomenSleevePattern.js";
import { ChildBackBodice } from "./Pattern/Child Pattern/ChildBackBodice.js";

(() => {
  resetSvg();
  entryPoint();
  manageButtons();
})();

function entryPoint() {
  drawGrid();
}

function resetSvg() {
  const grid = document.getElementById("grid").cloneNode(true);
  document.getElementById("svg").innerHTML = "";
  document.getElementById("svg").appendChild(grid);
}

function drawGrid() {
  let m = new Draw().drawGrid();
  document.getElementById("grid").setAttribute("d", m);
}

function manageButtons() {
  document
    .querySelector("#downloadSVG")
    ?.addEventListener("click", () => SVGDownloadHandler());
  document
    .querySelector("#generate_front_bodice")
    ?.addEventListener("click", () => generateFrontBodicePattern());
  document
    .querySelector("#generate_back_bodice")
    ?.addEventListener("click", () => generateBackBodicePattern());
  document
    .querySelector("#generate_women_sleeve")
    ?.addEventListener("click", () => generateWomenSleevePattern());
  manageLineStrokeRangeSelector();


  document
  .querySelector("#generate_child_front_bodice")
  ?.addEventListener("click", () => generateChildFrontBodicePattern());
document
  .querySelector("#generate_child_back_bodice")
  ?.addEventListener("click", () => generateChildBackBodicePattern());
document
  .querySelector("#generate_child_sleeve")
  ?.addEventListener("click", () => generateChildSleevePattern());
manageLineStrokeRangeSelector();
}

function generateChildFrontBodicePattern(){
  alert("Child front")
}
function generateChildBackBodicePattern(){
  const childPattern = new ChildBackBodice("svg");
  childPattern.draw();
}
function generateChildSleevePattern(){
  alert("Child sleeve")
}
function generateFrontBodicePattern() {

  const frontPattern = new WomenFrontBodice("svg");
  frontPattern.draw();
}

function generateBackBodicePattern() {

  const backPattern = new WomenBackBodice("svg");
  backPattern.draw();

}

function generateWomenSleevePattern() {

  const sleevePattern = new WomenSleevePattern("svg");
  sleevePattern.draw();
}




function manageLineStrokeRangeSelector() {
  const inputRange = document.querySelector('#line-stroke');

  inputRange.addEventListener('input', () => {
    const value = inputRange.value;

    const patternElementKeys = Object.keys(PatternElement.Element);
    patternElementKeys.forEach((patternElementKey) => {
      const mainElements = document.querySelectorAll("." + PatternElement.Element[patternElementKey].className);
      mainElements.forEach(element => {
        element.setAttribute('stroke-width', (value / 10) * PatternElement.Element[patternElementKey].weight);
      })

    })

    console.log(value);
  });



}
