export class Pattern{
    strokeWidth = .5;
    mainBlock=[];
    dartLines=[];
    extraElements =[];
    curves = [];
    constructor(lines){
        if(lines!=undefined){
        this.mainBlock.push(lines);
    }
    }
    
    draw(svgId){
        this.mainBlock.forEach(element =>{
            element.draw(svgId,this.strokeWidth);
        });

        this.dartLines.forEach(element =>{
            element.draw(svgId,this.strokeWidth);
        });

        this.extraElements.forEach(element =>{
            element.draw(svgId,this.strokeWidth);
        });
        this.curves.forEach(element =>{
            element.draw(svgId,this.strokeWidth);
        });
    }

     // Setter for the mainBlock property
  setMainBlock(lines) {
     this.mainBlock = lines;
  }

  // Getter for the mainBlock property
  getMainBlock() {
    return this.mainBlock;
  }

  // Setter for the dartLines property
  setDartLines(lines) {
    this.dartLines = lines;
  }

  // Getter for the dartLines property
  getDartLines() {
    return this.dartLines;
  }

  // Setter for the extraElements property
  setExtraElements(elements) {
    this.extraElements = elements;
  }

  // Getter for the extraElements property
  getExtraElements() {
    return this.extraElements;
  }

   // Setter for the Curves property
   setCurves(curves) {
    this.curves = curves;
  }

  // Getter for the Curves property
  getCurves() {
    return this.curves;
  }
}