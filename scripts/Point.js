export class Point{
  
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    getX(){
        return parseFloat( this.x);
    }
    getY(){
        return parseFloat(this.y);
    }
    setX(x){
        this.x=x;
    }
    setY(y){
        this.y=y;
    }

    toString(){
        return this.x + " " + this.y;
    }

    getPointAsArray(){
        return [this.x , this.y];
    }
}