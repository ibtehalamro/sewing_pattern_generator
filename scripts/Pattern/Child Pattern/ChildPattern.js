import { Pattern } from '../Pattern.js';
export class ChildPattern extends Pattern {

  elements = [];
  constructor(svgId) {
    super(svgId);
  }


  setElements(lines) {
    this.elements = lines;
  }

  getElements() {
    return this.elements;
  }

}