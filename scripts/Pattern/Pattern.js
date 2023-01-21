import { Measurements } from "../Measurements/Measurements.js";
import { Draw } from "../Draw.js";
export class Pattern {

  constructor(svgId) {
    this.svgId = svgId;
    this.strokeWidth = .5;
    this.measurements = new Measurements();

  }

  draw() {
    console.log('Pattern class draw method');
  }

  getMeasurementsFromUserInput(requiredMeasurements) {
    console.log('getMeasurementsFromUserInput', requiredMeasurements);
    const m = this.measurements.getMeasurementsFromUserInput(requiredMeasurements);
    return m;
  }

  resetSvg() {
    const grid = document.getElementById("grid").cloneNode(true);
    document.getElementById(this.svgId).innerHTML = "";
    document.getElementById(this.svgId).appendChild(grid);
  }

  drawGrid() {
    let m = new Draw().drawGrid();
    document.getElementById("grid").setAttribute("d", m);
  }

}