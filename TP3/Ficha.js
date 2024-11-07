class Ficha{
    constructor(radio, img, ctx, fill, jugador, casillero){
        this.r = radio;
        this.jugador = jugador;
        this.image_src = img;
        this.fill = fill;
        this.ctx = ctx;
        this.casillero = casillero;
        this.valor = 0;
    }
    isPointInside(mouse_x, mouse_y){
        let x = this.coordX - mouse_x;
        let y = this.coordY - mouse_y;
        return Math.sqrt(x * x + y * y) < this.r;
    }


    draw_image(){
        this.ctx.beginPath();
        this.ctx.arc(this.coordX, this.coordY, this.r, 0, 2 * Math.PI);//r=40
        /*this.ctx.fillStyle = this.fill;
        this.ctx.fill();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();*/
        this.ctx.closePath();
        if(this.img != ""){
            this.image = new Image();
            this.image.src = this.image_src;
            this.image.onload = () => {
                this.ctx.drawImage(this.image,this.coordX-this.r,this.coordY-this.r, this.r*2, this.r*2);
            }
        }
    
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.coordX, this.coordY, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.fill;
        this.ctx.fill();
        this.ctx.closePath();
    }

    getCtx(){
        return this.ctx;
    }
    setCtx(ctx){
        this.ctx = ctx;
    }
    getCoordenadaX(){
        return this.coordX;
    }
    getCoordenadaY(){
        return this.coordY;
    }
    setCoordenadaX(new_x){
        this.coordX = new_x;
    }
    setCoordenadaY(new_y){
        this.coordY = new_y;
    }
    setImage(img){
        this.image_src = img;
    }
    getImage(){
        return this.image_src;
    }
    getCasillero(){
        return this.casillero;
    }
    setCasillero(){
        this.casillero = false;     
    }
    getJugador(){
        return this.jugador;
    }
    setJugador(j){
        this.jugador = j;
    }
    getValor(){
        return this.valor;
    }
    setValor(v){
        this.valor = v;
    }
}