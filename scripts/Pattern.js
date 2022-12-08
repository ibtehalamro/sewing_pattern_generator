export class Pattern{
    lines=[];
    constructor(lines){
        if(lines!=undefined){
        this.lines.push(lines);
    }
    }
    getLines(){
        return this.lines;
    }

    addLine(line){
        this.lines.push(line);
    }

    
    printLines(){
        console.log(this.lines);
    }
}