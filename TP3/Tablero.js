class Tablero{
    constructor(ctx, img_tabl, colum, fila, radio, espacio, w, h, suma_x, suma_y){
        this.ctx = ctx;
        this.espacio = espacio;
        this.suma_x = suma_x;
        this.suma_y = suma_y;
        this.colum_max= colum;
        this.fila_max = fila;
        this.r = radio;
        this.img = img_tabl;
        this.imagen = new Image();
        this.imagen.src = this.img;
        this.imagen.onload = () => {
            this.draw();
        }
        this.matriz;
        this.inicializado = false;
        this.width_tablero = w/*760 */;
        this.height_tablero = h/*670*/;
        this.inicio_draw_x = 300;
        this.inicio_draw_y = 80;
       //this.inicializar_matriz();
    }

    cargar_ficha_en_tablero(x, y, img_ficha){
        //buscar casillero en matriz que tenga la posicion (mas o menos) pasadas (coorresponden al mouse)
        let pos_column = this.buscar_columna_de_pos_actual(x, y);
        this.dibujar_ultimo_casillero_disponible_en_pos(pos_column, img_ficha);
    }

    hay_ganador(){

    }

    buscar_columna_de_pos_actual(posX, posY){
        for(let fila = 0; fila < this.fila_max; fila++){
            for(let colum = 0; colum < this.colum_max; colum++){
                if(this.matriz[fila][colum].isPointInside(posX, posY)){
                    return colum;
                }
            }
        }
    }

    dibujar_ultimo_casillero_disponible_en_pos(colum, img_ficha){
        let freno = false;
        for(let fila = this.fila_max-1; fila >= 0; fila--){
            let casillero = this.matriz[fila][colum];
            if(!freno){
                if(casillero){
                    if(casillero.getCasillero()){
                        casillero.setImage(img_ficha);
                        casillero.draw_image();
                        casillero.setCasillero();
                        freno = true;
                    }
                }
            }
            
        }
    }

   /* buscar_casillero_y_dibujar_ficha(posX, posY){
        for(let fila = 0; fila < 7; fila++){
            this.matriz[fila].forEach(function(casillero){
              if(casillero.isPointInside(posX, posY)){
                    console.log(casillero);
                    //this.dibujar_ultimo_casillero_disponible(casillero);
                    casillero.setImage("fichaAngel.svg");
                    casillero.draw_image();
                }
            });
        }
    }*/
    inicializar_matriz(){
        this.matriz = [];
        for(let f = 0; f < this.fila_max; f++){
            let arr_colum = [];
            this.matriz.push(arr_colum);
            for(let c = 0; c < this.colum_max; c++){
                arr_colum.push(0);
            }
        }
    }
   
    recorrer_matriz(){
        //console.log(this.matriz); completa
        for(let fila = 0; fila < 7; fila++){
            //console.log(this.matriz[fila]);
            let elem_filas = "";
            this.matriz[fila].forEach(function(casillero){
                //console.log("Valores en columnas de la fila "+fila+":");
                //console.log(casillero);
                //elem_filas = elem_filas+"("+casillero.getCoordenadaX()+", "+casillero.getCoordenadaY()+")"+"; ";
                elem_filas = elem_filas+"("+casillero.getImage()+")"+"; ";
            });
            console.log("Valores en columnas de la fila "+fila+":");
            console.log(elem_filas);
        }
    }

    draw(){
            this.ctx.drawImage(this.imagen, this.inicio_draw_x,this.inicio_draw_y, this.width_tablero,this.height_tablero);
            if(this.inicializado){
                this.draw_de_casilleros_en_ctx(0,0, this.ctx, this.suma_x, this.suma_y, 140, 365, this.espacio);
            }else{
                this.draw_de_casilleros_en_ctx(0,0, this.ctx, this.suma_x, this.suma_y, 140, 365, this.espacio);
                this.inicializado = true;
            }
            
    }
    /*draw_ficha(ctx2, coord_x, coord_y, img){
        ctx2.beginPath();
        ctx2.arc(coord_x, coord_y, this.r, 0, 2 * Math.PI);
        ctx2.fillStyle = "white";
        ctx2.fill();
        ctx2.strokeStyle = "black";
        ctx2.lineWidth = 1;
        ctx2.stroke();
        ctx2.closePath();
        let image = new Image();
        image.src = img;
        image.onload = function(){
            ctx2.drawImage(image,coord_x-this.r,coord_y-this.r, this.r*2, this.r*2);
        }
    }*/
    /*draw_casillero_vacio(coord_x, coord_y, fill){

    }*/
    draw_de_casilleros_en_ctx(x_ini, y_ini, ctx, suma_x, suma_y, suma_inicio_y, suma_inicio_x, espacio){
        let cont_x = x_ini;
        let cont_y = y_ini;
        let inicioy = true;
        let iniciox = true;
        for(let fila = 0; fila < this.fila_max; fila++){//y
            if(inicioy){
                cont_y+=suma_inicio_y;
                inicioy = false;
            }
            else{
                cont_y+=suma_y+espacio;
            }
            for(let colum = 0; colum < this.colum_max; colum++){//x
                if(iniciox){
                    cont_x+=suma_inicio_x;
                    iniciox = false;
                }else{
                    cont_x+=suma_x+espacio;
                }   
                if(this.inicializado){
                    if(!this.matriz[fila][colum].getCasillero()){
                        this.matriz[fila][colum].draw_image();
                    }else{
                        let casillero = new Casillero(this.r, ctx);
                        casillero.setCoordenadaX(cont_x);
                        casillero.setCoordenadaY(cont_y);
                        casillero.draw();
                        this.matriz[fila][colum] = casillero;
                    }
                }else{
                    let casillero = new Casillero(this.r, ctx);
                    casillero.setCoordenadaX(cont_x);
                    casillero.setCoordenadaY(cont_y);
                    casillero.draw();
                    this.matriz[fila][colum] = casillero;
                }
               
               
            }
            cont_x = 0;
            iniciox = true;
        }
        //this.recorrer_matriz();
    }

}