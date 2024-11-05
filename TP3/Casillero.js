class Casillero extends Ficha{
    constructor(radio, ctx){
        super(radio, "", ctx, "white",0);
        this.valor = 0;
        this.casillero = true;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.coordX, this.coordY, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.fill;
        this.ctx.fill();
        this.ctx.closePath();
    }
}