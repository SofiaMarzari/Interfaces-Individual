class Tablero{
    constructor(ctx, img_tabl, colum, fila, radio, espacio, w, h, suma_x, suma_y, espacio_hints, juego_elegido){
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
        this.image_hint = new Image();
        this.image_hint.src = "../TP3/uploads/flecha_hint.png";
        this.image_hint.onload = () => {}
        this.matriz;
        this.inicializado = false;
        this.width_tablero = w;
        this.height_tablero = h;
        this.inicio_draw_x =280;
        this.inicio_draw_y = 80;
        this.hints = [];
        this.espacio_hints = espacio_hints;
        this.ganador = 0;
        this.juego_elegido = juego_elegido;
    }

    isPointInside(mouse_x, mouse_y){
        let rango_x = ((mouse_x > (this.inicio_draw_x+50)) && (mouse_x < ((this.inicio_draw_x + this.width_tablero)-50)));
        let rango_y = (/*(mouse_y > (this.inicio_draw_y+70)) &&*/(mouse_y < ((this.inicio_draw_y + this.height_tablero)-50)));
        if(rango_x && rango_y){//la ficha esta dentro del tablero
            return true;
        }else{
            return false;
        }
    }

    ubicacion_de_ficha(x, y){//Recibimos coordenada del mouse en x, en y, y el obj Ficha seleccionado
        let pos_column = this.buscar_columna_de_pos_actual(x, y);//Busco en que columna se debe dibujar la Ficha, respecto a la posicion del mouse
        if(pos_column.colum != -1){
            //this.dibujar_ultimo_casillero_disponible_en_pos(pos_column.colum, img_ficha, jugador);//Dibujo la ficha
            return {'colum':pos_column.colum, 'estado':true};
        }else{
            return {'colum':-1, 'estado':false};
        }
    }

    hay_ganador(){
        let check1 = this.revisar_horizontal();
        let check2 = this.revisar_vertical();
        if(check1){
           return true;
        }else if(check2){
            return true;
        }else{
            return false;
        }
    }
    revisar_horizontal(){
        let cont = 1;

        for(let fila = 0; fila < this.fila_max; fila++){
            for(let c = 0; c < this.matriz[fila].length-1; c++){
                if((this.matriz[fila][c].getJugador()==1) || (this.matriz[fila][c].getJugador()==2)){
                    if(this.matriz[fila][c].getJugador() == this.matriz[fila][c+1].getJugador()){
                        cont++;
                        if(cont == this.juego_elegido){
                            this.ganador = this.matriz[fila][c].getJugador();
                           return true;
                        }
                  
                
                    }else{
                        cont = 1;
                    }
                }
               
            }
            cont = 1;
        }
    }
    revisar_vertical(){
        let cont = 1;
        let colum = 0;
        while(colum < this.colum_max){
            for(let fila = 0; fila < this.fila_max-1; fila++){
                if((this.matriz[fila][colum].getJugador()==1) || (this.matriz[fila][colum].getJugador()==2)){
                    if(this.matriz[fila][colum].getJugador() == this.matriz[fila+1][colum].getJugador()){
                        cont++;
                        if(cont == this.juego_elegido){
                            this.ganador = this.matriz[fila][colum].getJugador();
                           return true;
                        }
                    }else{
                        cont = 1;
                    }
                }
            }
            cont = 1;
            colum++;
        }
        
    }
    /**Si las coordenadas del casillero actual se ajustan a la posicion del mouse, estoy en la columna donde se dibujara, la retorno**/
    buscar_columna_de_pos_actual(posX, posY){
        if(this.isPointInside(posX, posY)){//estoy dentro del tablero/hints para poder evaluar columna
            for(let fila = 0; fila < this.fila_max; fila++){//evalua si se trata de algun casillero
                for(let colum = 0; colum < this.colum_max; colum++){
                    if(this.matriz[fila][colum].isPointInside(posX, posY)){
                        return {'colum':colum, 'valido':true};
                    }
                }
            }
            for(let colum = 0; colum < this.hints.length; colum++){//evalua si se trata de un hint y cuál
                let xx = this.hints[colum].x - posX;
                let yy = this.hints[colum].y - posY;
                if(Math.sqrt(xx*xx+yy*yy)<this.hints[colum].r){
                    return {'colum':colum, 'valido':true};
                }
            }
            return {'colum':-1, 'valido':false};
        }else{
            return {'colum':-1, 'valido':false};
        }
       
    }
    /*Le setea la imagen de la ficha seleccionada Al casillero donde debe ir.
    *Le carga el jugador.
    *Dibuja la Ficha con su metodo de dibujar imagen.*/
    dibujar_casillero(casillero, ficha_seleccionada){
        casillero.setImage(ficha_seleccionada.getImage());
        casillero.draw_image();
        casillero.setCasillero();
        casillero.setJugador(ficha_seleccionada.getJugador());
    }
    /*Pasada una columna (donde cae la ficha), busca el casillero mas proximo al
    *final de la columna, que este disponible, es decir casillero=true, y lo retorna.*/
    get_casillero_disponible_en_colum(colum){
        for(let fila = this.fila_max-1; fila >= 0; fila--){
            let casillero = this.matriz[fila][colum];
                if(casillero){
                    if(casillero.getCasillero()){
                       return casillero;
                    }
                }
        }
    }

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
        for(let fila = 0; fila < this.fila_max; fila++){
            //console.log(this.matriz[fila]);
            let elem_filas = "";
            this.matriz[fila].forEach(function(casillero){//sin forEach
                //console.log("Valores en columnas de la fila "+fila+":");
                //console.log(casillero);
                //elem_filas = elem_filas+"("+casillero.getCoordenadaX()+", "+casillero.getCoordenadaY()+")"+"; ";
                elem_filas = elem_filas+"("+casillero.getJugador()+")"+"; ";
            });
            console.log("Valores en columnas de la fila "+fila+":");
            console.log(elem_filas);
        }
    }
    /*
     *El Tablero se dibuja primero y luego, si es la primera vez que se carga/dibuja guardara dicho estado */
    draw(){
        this.ctx.drawImage(this.imagen, this.inicio_draw_x,this.inicio_draw_y, this.width_tablero,this.height_tablero);
        if(this.inicializado){
            this.draw_de_casilleros_en_ctx(0,0, this.ctx, this.suma_x, this.suma_y, 140, 350, this.espacio);
        }else{
            this.draw_de_casilleros_en_ctx(0,0, this.ctx, this.suma_x, this.suma_y, 140, 350, this.espacio);
            this.inicializado = true;
        }
        this.draw_hints();
    }

    draw_hints(){
        let x = 340;
        for(let c = 0; c < this.colum_max; c++){
            this.ctx.beginPath();
            this.ctx.arc(x, 40, 35, 0, 2* Math.PI);
            this.draw_image_hints(x);
            this.ctx.closePath();
            this.hints.push({'x':x,'y':40, 'r':35});
            x=x+this.espacio_hints;
        }
    }

    draw_image_hints(x){
        this.ctx.drawImage( this.image_hint, x-30, 40-30, 30*2, 30*2);
    }

   /*
   *Dibuja lo que contenga su matriz.
   *Si son fichas del contorno comenzaran a dibujarse mas lejos del contorno que el espacio entre ellas, 
   *para obtener efecto de padding del tablero.
   *Si el tablero es la primera vez que se carga debe llenarse solo de Casilleros, que van vacios, en blanco.
   *Sino, revisa cada vez si el elemento actual no es un casillero por ende debe llamar al draw imagen y no fallara, sino al draw comun
   *que dibuja la ficha vacia*/
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
                        let casillero = new Ficha(this.r, "", ctx, "white", 0, true);
                        casillero.setCoordenadaX(cont_x);
                        casillero.setCoordenadaY(cont_y);
                        casillero.draw();
                        this.matriz[fila][colum] = casillero;
                    }
                }else{
                    let casillero = new Ficha(this.r,"", ctx, "white", 0, true);
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

    getGanador(){
        return this.ganador;
    }
    setGanador(){
        this.ganador =0;
    }

}