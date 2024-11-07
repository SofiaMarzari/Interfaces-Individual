function load_main(){
    let canvas = document.getElementById('myCanvas');
   // canvas.width = 1320/*screen.width*/;
   // canvas.height = 755;
    //si es 6 en linea:
    //canvas.height = 855;
    let ctx = canvas.getContext("2d");
    let div_mensaje = document.getElementById('div-mensaje-juego');
    /************************************************************************* */
    /*Inicializando variables*/
    var jugador1 = [];
    var jugador2 = [];
    var ficha_seleccionada = null;
    var press = false;
    let opcion_cantidad_linea = 4; //default 4, deberia tomarse el valor de un select en la vista, para que el usuario elija, y sea dinamico
    let radio,espacio,suma_x,suma_y;
    //Determinamos segun lo "elegido por el ususario" los tamaños de la ficha, espacios entre ellas para dibujarlas en el tablero sin agrandar el tablero
    if(opcion_cantidad_linea == 4){
        radio = 40;
        espacio = 15;
        suma_x = 75;
        suma_y = 75;
    }else if(opcion_cantidad_linea == 5){
        radio = 32;
        espacio = 1;
        suma_x = 75;
        suma_y = 75;
    }else if(opcion_cantidad_linea == 5){
        radio = 30;
        espacio = 2;
        suma_x = 65;
        suma_y = 65;
    }
    let pos_ficha,coordX_original, coordY_original;
    let filas_tablero = opcion_cantidad_linea+2;
    let columnas_tablero = opcion_cantidad_linea+3;
    let cant_fichas_jugador = (filas_tablero*columnas_tablero)/2/*cantidad_fichas(opcion_cantidad_linea, filas_tablero, columnas_tablero)*/;
    let img_seleccionada;
    let press_ficha_j1,press_ficha_j2=false;
    let data_width_tablero = 670;
    let data_height_tablero = 570;
    //Instanciamos un tablero y le pasamos los valores para sus atributos
    var tablero = new Tablero(ctx, "../TP3/uploads/tablero_1.jpg", columnas_tablero, filas_tablero, radio, espacio, data_width_tablero, data_height_tablero, suma_x, suma_y);
    //Creamos e iniciamos la matriz del tablero
    tablero.inicializar_matriz();
    //Dibujamos el tablero
    tablero.draw();
    //Cargamos los arreglos de fichas para los jugadores en la vista, con obj Ficha
    cargar_grupos_fichas(cant_fichas_jugador, ctx, jugador1, jugador2);
    //Dibujamos las Fichas para que los jugadores arrastren luego, segun la cantidad calculada anteriormente
    dibujar_fichas_jugador(jugador1,75);
    dibujar_fichas_jugador(jugador2,1100);
    /******************************************************************************** */
    canvas.addEventListener('dragover', function(ev){
        ev.preventDefault(c);
    });
    /**Se ejecuta al presionar el mouse..**/
    canvas.addEventListener('mousedown', function(ev){
        ev.preventDefault();
        let data = leer_mouse(ev, canvas);//Retorna coordenadas del mouse dentro del canvas, no respecto a la pantalla
        //Revisa en el grupo de fichas 1, si el mouse esta sobre alguna de las fichas del mismo
        for(j = 0; j < jugador1.length; j++){
            if(jugador1[j].isPointInside(data.x, data.y)){//de ser asi, guarda la ficha seleccionada para luego utilizarla, setea press en true ya que presiono en un lugar valido del canvas
                ficha_seleccionada = jugador1[j];
                pos_ficha = j;
                coordX_original = ficha_seleccionada.getCoordenadaX();
                coordY_original = ficha_seleccionada.getCoordenadaY();
                press_ficha_j1=true;
                press = true;
                break;
            }
            if(ficha_seleccionada != null){//no
                break;
            }
        }
        /*Podria simplificarse*/
        //Revisa en el grupo de fichas 2, si el mouse esta sobre alguna de las fichas del mismo
        for(j = 0; j < jugador2.length; j++){
            if(jugador2[j].isPointInside(data.x, data.y)){
                ficha_seleccionada = jugador2[j];
                pos_ficha = j;
                coordX_original = ficha_seleccionada.getCoordenadaX();
                coordY_original = ficha_seleccionada.getCoordenadaY();
                press_ficha_j2=true;
                press = true;
                break;
            }
            if(ficha_seleccionada != null){
                break;
            }
        }
    });
    /**Se ejecuta al mover el mouse.. **/
    canvas.addEventListener('mousemove', function(ev){
        ev.preventDefault();
        //Si nos encontramos presionando una ficha entonces procede..
        if(press){
            if(ficha_seleccionada != null){//Chequea que tengamos una ficha seleccionada efectivamente, y no en null
                div_mensaje.classList.remove('visible');
                div_mensaje.classList.add('no-visible');
                let data = leer_mouse(ev, canvas);//Pedimos coordenadas del mouse actualmente mientras se presiona
                //Le modificamos las coordenadas a la Ficha seleccionada para que se mueva
                ficha_seleccionada.setCoordenadaX(data.x);
                ficha_seleccionada.setCoordenadaY(data.y);
                clearCanvas(ctx);//Reseteamos TODO el canvas para que no quede el "camino de copias" o rastro del movimiento
                tablero.draw();//dibujamos tablero
                ficha_seleccionada.draw_image();//Dibujamos la ficha seleccionada
            }
        }
    });
    /**Se ejecuta cuando soltamos el mouse.. **/
    canvas.addEventListener('mouseup', function(ev){
        ev.preventDefault();
        //Si estabamos presionando una ficha...
        if(press){
            let data = leer_mouse(ev, canvas);//lee coordenadas del mouse actualmente, donde suelto la ficha (la ficha igualmente tiene esa ultimas coordenadas seteadas)
            /*
            if(press_ficha_j1){
                img_seleccionada = jugador1[0].getImage();
            }else if(press_ficha_j2){
                img_seleccionada = jugador2[0].getImage();
            }*/
            if(tablero.cargar_ficha_en_tablero(data.x, data.y, ficha_seleccionada)){ //Dibujamos la ficha seleccionada en el tablero y pasamos data del mouse a dicho metodo
                //Llamamos a la funcion que inicia la caida de la ficha en el tablero..
                comenzar_animacion(ficha_seleccionada, data.x, data.y,ctx,tablero,jugador1,jugador2);
                //Revisamos si la ficha seleccionada es del grupo del jugador 1 o 2 para eliminar una del array de fichas del mismo
                if(press_ficha_j1){
                    jugador1.slice(pos_ficha, 1);
                }else if(press_ficha_j2){
                    jugador2.slice(pos_ficha, 1);
                }
                //chequear si existe ganador en esta ronda...
                if(tablero.hay_ganador()){
                    //no llegue
                }
            }else{
                div_mensaje.classList.remove('no-visible');
                div_mensaje.classList.add('visible');
                ficha_seleccionada.setCoordenadaX(coordX_original);
                ficha_seleccionada.setCoordenadaY(coordY_original);
                clearCanvas(ctx);
                tablero.draw();
                ficha_seleccionada.draw_image();
            }
            
            //Reiniciamos variables
            press=false;
            ficha_seleccionada = null;
            press_ficha_j1=false;
            press_ficha_j2=false;
            //Volvemos a limpiar todo el canvas y a dibujar el tablero
            clearCanvas(ctx);
            tablero.draw();
            //Dibujamos grupos en el canvas (anteriormente reseteado) y con una menos por la eliminacion anterior
            dibujar_fichas_jugador(jugador1,75);
            dibujar_fichas_jugador(jugador2,1100);
            
           // tablero.recorrer_matriz(); //OKprueba de que setea bien los valores en la matriz para chequear ganador luego con metodos del tablero
            
            
        }
    });
}
    /***
     * Funcion para dibujar grupo de fichas en el canvas
     * para el uso de arrastre por el jugador. Segun los valores de medida 
     * pasada dibuja en el lado derecho o izquierdo
     * */
    function dibujar_fichas_jugador(grupo_fichas,medidaX){
        let posX = medidaX;
        let posY = 60;
        for(let i = 0; i < grupo_fichas.length; i++){
            grupo_fichas[i].setCoordenadaX(posX);
            grupo_fichas[i].setCoordenadaY(posY);
            grupo_fichas[i].draw_image();

            if(i > 0){
                if(i%3==0){
                    posY = posY+60;
                    if(medidaX>100){
                        posX=1020;
                    }else{
                        posX = 0;
                    }
                }
                posX = posX+80;
            }else{
                posX = medidaX;
            }
        }
    }
    /***
     * Funciones para la animacion de caida en gravedad de la ficha en el tablero.
     * Se ira moviendo la ficha segun el incremente de la coordenada, comenzando
     * desde el valor pasado por parametro. Al moverse debe ir reseteando el canvas
     * y por ende volviendo a dibujar todo el tablero, fichas y la propia ficha que cae
    * */
    let yy =0;
    let interval;
    function comenzar_animacion(ficha_seleccionada, x, y, ctx,tablero,j1,j2){
        yy = y;
        interval = setInterval(gravedad,1,ficha_seleccionada,x,ctx,tablero,j1,j2);
    }
    function gravedad(ficha_seleccionada,x, ctx,tablero,j1,j2){
        if(yy<570){
            clearCanvas(ctx);
            tablero.draw();
            dibujar_fichas_jugador(j1,75);
            dibujar_fichas_jugador(j2,1100);
            ficha_seleccionada.setCoordenadaX(x);
            ficha_seleccionada.setCoordenadaY(yy);
            ficha_seleccionada.draw_image();
            yy+=50;
        }else{
            stop_interval();
        }
    }
    function stop_interval(){
        clearInterval(interval);
    }
    function clearCanvas(ctx){
        ctx.clearRect(0, 0, 1660, 755);
    }
    function clearTablero(ctx){
        ctx.clearRect(400, 80, 1600, 760);
    }
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    /*Se utilizo este metodo porque los calculos iban mejor en vez de utilizar ev.clientX por ejemplo
     *porque todo lo que se tomara del mouse respecto a la pantalla no concordaba/servia. Y no podia
     *utilizar respecto a un elemento porque es un canvas, son dibujos
    */
    function leer_mouse(ev, canvas){
        let ClientRect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / ClientRect.width;
        var scaleY = canvas.height / ClientRect.height;
        let x_mouse = (ev.clientX - ClientRect.left) * scaleX;
        let y_mouse = (ev.clientY - ClientRect.top) * scaleY;
    
        return {'x':x_mouse, 'y':y_mouse};
    }
    /*
    function cantidad_fichas(opcion_cantidad_linea, filas_tablero, columnas_tablero){
        switch (opcion_cantidad_linea){
            case 4:
                filas_tablero = 6;
                columnas_tablero = 7;
                break;
            case 5:
                filas_tablero = 8;
                columnas_tablero = 7;
                break;
            case 6:
                filas_tablero = 9;
                columnas_tablero = 8;
                break;
        }
        return (filas_tablero*columnas_tablero)/2;
    }*/
    function cargar_grupos_fichas(cant_fichas_jugador, ctx, jugador1, jugador2){
        for(let o = 0; o < cant_fichas_jugador*2; o++){
            let ficha = new Ficha(40, "", ctx, "white", 0, false);
            if(o%2==0){
                ficha.setImage("../TP3/uploads/fichaAngel.svg");
                ficha.setJugador(1);
                jugador1.push(ficha);
            }else{
                ficha.setImage("../TP3/uploads/fichaDemonio.svg");
                ficha.setJugador(2);
                jugador2.push(ficha);
            }
        }
       /* for(let o = 0; o < cant_fichas_jugador; o++){
            let ficha = new Ficha(40, "../TP3/uploads/fichaDemonio.svg", ctx, "white", 2);
            jugador2.push(ficha);
        }*/
    }