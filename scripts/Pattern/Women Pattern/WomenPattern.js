import {Pattern} from '../Pattern.js';
export class WomenPattern extends Pattern {

   elements = [];
    constructor(svgId){
      super(svgId);

    }
    //TODO : remove bellow once refactor is complete
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
          element.draw(svgId, PatternElement.Element.Neck);
        });
        console.log('SleeveCurves', this.SleeveCurves)
        this.SleeveCurves.forEach(element => {
          element.drawSleeveCurve(svgId, PatternElement.Element.SleeveCurve);
        });
      }


    setElements(lines) {
        this.elements = lines;
      }
    
      getElements() {
        return this.elements;
      }

}