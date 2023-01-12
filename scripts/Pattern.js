import { PatternElement } from "./PatternElement.js";

export class Pattern {
  strokeWidth = .5;
  mainElements = [];
  dartLines = [];
  guideElements = [];
  armholeCurves = [];
  NecklineCurves = [];
  constructor(lines) {
    if (lines != undefined) {
      this.mainElements.push(lines);
    }
  }

  draw(svgId) {
    this.mainElements.forEach(element => {
      element.draw(svgId, PatternElement.Element.Main);
    });

    this.dartLines.forEach(element => {
      element.draw(svgId, PatternElement.Element.Dart);
    });

    this.guideElements.forEach(element => {
      element.draw(svgId, PatternElement.Element.Guide);
    });
    this.armholeCurves.forEach(element => {
      element.draw(svgId, PatternElement.Element.Armhole);
    });
    this.NecklineCurves.forEach(element => {
      element.draw(svgId, PatternElement.Element.Armhole);
    });
  }

  setMainElements(lines) {
    this.mainElements = lines;
  }

  getMainElements() {
    return this.mainElements;
  }

  setDartLines(lines) {
    this.dartLines = lines;
  }

  getDartLines() {
    return this.dartLines;
  }

  setGuideElements(elements) {
    this.guideElements = elements;
  }

  getGuideElements() {
    return this.guideElements;
  }

  setArmholeCurves(curves) {
    this.armholeCurves = curves;
  }

  getArmholeCurves() {
    return this.armholeCurves;
  }

  setNeckLineCurves(curves) {
    this.NecklineCurves = curves;
  }

  getNeckLineCurves() {
    return this.NecklineCurves;
  }
}