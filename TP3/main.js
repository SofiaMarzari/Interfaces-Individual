    let canvas;
    let ctx;
    let timer_container;
    let div_mensaje;
    let data_mensaje_ganador;
    let div_opacity;
    let div_mensaje_ganador;
    let div_mensaje_completo;
    /************************************************************************* */
    /*Inicializando variables*/
    let jugador1 = [];
    let jugador2 = [];
    let img_ficha_j1; 
    let img_ficha_j2;
    let ficha_seleccionada = null;
    let press = false;
    let opcion_cantidad_linea;
    let radio,espacio,suma_x,suma_y,espacio_hints;
    let pos_ficha,coordX_original, coordY_original;
    let filas_tablero;
    let columnas_tablero;
    let cant_fichas_jugador;
    let press_ficha_j1,press_ficha_j2=false;
    let data_width_tablero = 640;//default
    let data_height_tablero = 530;//default
    let tablero;
    let val_time = 59;
    let val_time_minutos = 3;
    let timer_var_interval;
    let turno = 1;
    function load_main(datosConfig){
        reset_variables();
        canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext("2d");
        div_mensaje = document.getElementById('div-mensaje-juego');
        data_mensaje_ganador = document.getElementById('data-ganador-mensaje');
        div_mensaje_ganador = document.getElementById('mensaje_ganador');
        div_opacity = document.getElementById('div_opacity');
        div_mensaje_completo = document.getElementById('mensaje_completo_info');
        timer_container = document.getElementById('timer-time');
        timer_var_interval = setInterval(correr_timer, 1000, timer_container);
        if(datosConfig.tipo_juego_cantidad != undefined){
            opcion_cantidad_linea = parseInt(datosConfig.tipo_juego_cantidad);
        }else{
            opcion_cantidad_linea = 4;
        }
        if(datosConfig.img_ficha_j1 != undefined){
            img_ficha_j1 = datosConfig.img_ficha_j1;
        }else{
            img_ficha_j1 = "fichaAngel.svg";
        }
        if(datosConfig.img_ficha_j2 != undefined){
            img_ficha_j2 = datosConfig.img_ficha_j2;
        }else{
            img_ficha_j2 = "fichaDemonio.svg";
        }
        //Determinamos segun lo "elegido por el ususario" los tamaños de la ficha, espacios entre ellas para dibujarlas en el tablero sin agrandar el tablero
        if(opcion_cantidad_linea == 4){
            radio = 35;
            espacio = 8;
            suma_x = 75;
            suma_y = 75;
            data_width_tablero = 640;
            data_height_tablero = 530;
            espacio_hints = 84;
        }else if(opcion_cantidad_linea == 5){
            radio = 32;
            espacio = 1;
            suma_x = 75;
            suma_y = 75;
            data_width_tablero = 670;
            data_height_tablero = 580;
            espacio_hints = 77;
        }else if(opcion_cantidad_linea == 6){
            radio = 30;
            espacio = 2;
            suma_x = 65;
            suma_y = 65;
            data_width_tablero = 670;
            data_height_tablero = 580;
            espacio_hints = 68;
        }
        filas_tablero = opcion_cantidad_linea+2;
        columnas_tablero = opcion_cantidad_linea+3;
        cant_fichas_jugador = (filas_tablero*columnas_tablero)/2/*cantidad_fichas(opcion_cantidad_linea, filas_tablero, columnas_tablero)*/;
        //Instanciamos un tablero y le pasamos los valores para sus atributos
        tablero = new Tablero(ctx, "../TP3/uploads/tablero_1.jpg", columnas_tablero, filas_tablero, radio, espacio, data_width_tablero, data_height_tablero, suma_x, suma_y, espacio_hints, opcion_cantidad_linea);
        //Creamos e iniciamos la matriz del tablero
        tablero.inicializar_matriz();
        //Dibujamos el tablero
        tablero.draw();
        //Cargamos los arreglos de fichas para los jugadores en la vista, con obj Ficha
        cargar_grupos_fichas(cant_fichas_jugador, ctx, jugador1, jugador2);
        //Dibujamos las Fichas para que los jugadores arrastren luego, segun la cantidad calculada anteriormente
        dibujar_fichas_jugador(jugador1,140);
        dibujar_fichas_jugador(jugador2,1100);
        canvas.addEventListener('dragover', function(ev){
            ev.preventDefault(c);
        });
        /**Se ejecuta al presionar el mouse..**/
        canvas.addEventListener('mousedown', mouseDown);
        /**Se ejecuta al mover el mouse.. **/
        canvas.addEventListener('mousemove', mouseMove);
        /**Se ejecuta cuando soltamos el mouse.. **/
        canvas.addEventListener('mouseup', mouseUp);
    }
    function mouseUp(ev){
        ev.preventDefault();
        //Si estabamos presionando una ficha...
        if(press){
            let data = leer_mouse(ev);//lee coordenadas del mouse actualmente, donde suelto la ficha (la ficha igualmente tiene esa ultimas coordenadas seteadas)
            let ubicacion_de_ficha = tablero.ubicacion_de_ficha(data.x, data.y);//pedimos al tablero la columna donde se ubicara la ficha
            if(ubicacion_de_ficha.estado){ //Dibujamos la ficha seleccionada en el tablero y pasamos data del mouse a dicho metodo
                let casillero_disp = tablero.get_casillero_disponible_en_colum(ubicacion_de_ficha.colum);//pedimos el casillero donde irá
                if(casillero_disp !== undefined){//si existe casillero disponible en esa columna...
                    ficha_seleccionada.setCoordenadaX(casillero_disp.getCoordenadaX());
                    ficha_seleccionada.setCoordenadaY(casillero_disp.getCoordenadaY());
                    //Llamamos a la funcion que inicia la caida de la ficha en el tablero..
                    comenzar_animacion(ficha_seleccionada, data.x, data.y);
                    tablero.dibujar_casillero(casillero_disp, ficha_seleccionada);
                    //Revisamos si la ficha seleccionada es del grupo del jugador 1 o 2 para eliminar una del array de fichas del mismo
                    if(press_ficha_j1){
                        jugador1.splice(pos_ficha, 1);
                        turno = 2;
                    }else if(press_ficha_j2){
                        jugador2.splice(pos_ficha, 1);
                        turno = 1;
                    }
                }else{//informa que la columna donde esta tirando al ficha esta llena..
                    div_mensaje.classList.remove('no-visible');
                    div_mensaje.classList.add('visible');
                    div_mensaje.innerHTML = "No hay mas lugar en esa columna. ¡Intente nuevamente!";
                }
                
                //Chequear si existe ganador...
                if(tablero.hay_ganador()){
                    stop_interval(timer_var_interval);//frenamos el timer
                    div_mensaje_ganador.classList.remove('no-visible');
                    div_mensaje_ganador.classList.add('visible');
                    div_opacity.classList.remove('no-visible');
                    div_opacity.classList.add('visible');
                    data_mensaje_ganador.innerHTML = "Jugador "+tablero.getGanador();//mostramos cartel con ganador
                    document.getElementById('btn-reiniciar').addEventListener('click', function(){
                        reset_variables();
                        loadConfigJuego();
                    });
                }
            }else{
                div_mensaje.classList.remove('no-visible');
                div_mensaje.classList.add('visible');
                div_mensaje.innerHTML = "No se puede soltar la ficha fuera de una columna o HINT. ¡Intente nuevamente!";
                ficha_seleccionada.setCoordenadaX(coordX_original);
                ficha_seleccionada.setCoordenadaY(coordY_original);
                clearCanvas();
                tablero.draw();
                ficha_seleccionada.draw_image();
            }
            
            //Reiniciamos variables
            press=false;
            ficha_seleccionada = null;
            press_ficha_j1=false;
            press_ficha_j2=false;
            //Volvemos a limpiar todo el canvas y a dibujar el tablero
            clearCanvas();
            tablero.draw();
            //Dibujamos grupos en el canvas (anteriormente reseteado) y con una menos por la eliminacion anterior
            dibujar_fichas_jugador(jugador1,140);
            dibujar_fichas_jugador(jugador2,1100);
            
        // tablero.recorrer_matriz(); //OKprueba de que setea bien los valores en la matriz para chequear ganador luego con metodos del tablero
            
            
        }
    }
    function mouseMove(ev){
        ev.preventDefault();
        //Si nos encontramos presionando una ficha entonces procede..
        if(press){
            if(ficha_seleccionada != null){//Chequea que tengamos una ficha seleccionada efectivamente, y no en null
                div_mensaje.classList.remove('visible');
                div_mensaje.classList.add('no-visible');
                let data = leer_mouse(ev);//Pedimos coordenadas del mouse actualmente mientras se presiona
                if(tablero.isPointInside(data.x, data.y)){
                    clearTablero();
                    tablero.draw();
                    //Le modificamos las coordenadas a la Ficha seleccionada para que se mueva
                    ficha_seleccionada.setCoordenadaX(data.x);
                    ficha_seleccionada.setCoordenadaY(data.y);
                }else{
                    clearCanvas();//Reseteamos TODO el canvas para que no quede el "camino de copias" o rastro del movimiento
                    tablero.draw();//dibujamos tablero
                    dibujar_fichas_jugador(jugador1,140);
                    dibujar_fichas_jugador(jugador2,1100);
                    //Le modificamos las coordenadas a la Ficha seleccionada para que se mueva
                    ficha_seleccionada.setCoordenadaX(data.x);
                    ficha_seleccionada.setCoordenadaY(data.y);
                } 
            }
            ficha_seleccionada.draw_image();//Dibujamos la ficha seleccionada
        }
    }
    function mouseDown(ev){
        ev.preventDefault();
        let data = leer_mouse(ev);//Retorna coordenadas del mouse dentro del canvas, no respecto a la pantalla
        //Revisa en el grupo de fichas 1, si el mouse esta sobre alguna de las fichas del mismo
        for(j = 0; j < jugador1.length; j++){
            if(jugador1[j].isPointInside(data.x, data.y)){//de ser asi, guarda la ficha seleccionada para luego utilizarla, setea press en true ya que presiono en un lugar valido del canvas
                if(turno == 1){
                    ficha_seleccionada = jugador1[j];
                    pos_ficha = j;
                    coordX_original = ficha_seleccionada.getCoordenadaX();
                    coordY_original = ficha_seleccionada.getCoordenadaY();
                    press_ficha_j1=true;
                    press = true;
                    break;
                }else{
                    div_mensaje.classList.remove("no-visible");
                    div_mensaje.classList.add("visible");
                    div_mensaje.innerHTML = "¡No es tu turno!";
                }
            }
        }
        /*Podria simplificarse*/
        //Revisa en el grupo de fichas 2, si el mouse esta sobre alguna de las fichas del mismo
        for(j = 0; j < jugador2.length; j++){
            if(jugador2[j].isPointInside(data.x, data.y)){
            if(turno == 2){
                    ficha_seleccionada = jugador2[j];
                    pos_ficha = j;
                    coordX_original = ficha_seleccionada.getCoordenadaX();
                    coordY_original = ficha_seleccionada.getCoordenadaY();
                    press_ficha_j2=true;
                    press = true;
                    break;
            }else{
                    div_mensaje.classList.remove("no-visible");
                    div_mensaje.classList.add("visible");
                    div_mensaje.innerHTML = "¡No es tu turno!";
            }
            }
        }
    }
    function reset_variables(){
        jugador1 = [];
        jugador2 = [];
        ficha_seleccionada = null;
        press = false;
        press_ficha_j1,press_ficha_j2=false;
        val_time = 59;
        val_time_minutos = 3;
        turno = 1;
    }
    function correr_timer(timer_container){
        if(val_time_minutos>=0){
            timer_container.innerHTML = val_time_minutos+":"+val_time;
            if(val_time == 0){
                val_time = 59;
                val_time_minutos = val_time_minutos-1;
            }else{
                val_time=val_time-1;
            }
        }else{
            stop_interval(timer_var_interval);
            div_mensaje_ganador.classList.remove('no-visible');
            div_mensaje_ganador.classList.add('visible');
            div_opacity.classList.remove('no-visible');
            div_opacity.classList.add('visible');
            div_mensaje_completo.innerHTML = "Se termino el tiempo del juego";
            document.getElementById('btn-reiniciar').addEventListener('click', function(){
                reset_variables();
                loadConfigJuego();
            });
        }
    }
    /***
     * Funcion para dibujar grupo de fichas en el canvas
     * para el uso de arrastre por el jugador. Segun los valores de medida 
     * pasada dibuja en el lado derecho o izquierdo
     * */
    function dibujar_fichas_jugador(grupo_fichas,medidaX){
        let posX = medidaX;
        let posY = 400;
        for(let i = 0; i < grupo_fichas.length; i++){
            grupo_fichas[i].setCoordenadaX(posX);
            grupo_fichas[i].setCoordenadaY(posY);
            grupo_fichas[i].draw();

            posY = posY-5;
        }
        grupo_fichas[grupo_fichas.length-1].setCoordenadaX(posX);
        grupo_fichas[grupo_fichas.length-1].setCoordenadaY(400-(5*grupo_fichas.length));
       /* grupo_fichas[grupo_fichas.length-1].draw();*/
        grupo_fichas[grupo_fichas.length-1].draw_image();
    }
    /***
     * Funciones para la animacion de caida en gravedad de la ficha en el tablero.
     * Se ira moviendo la ficha segun el incremente de la coordenada, comenzando
     * desde el valor pasado por parametro. Al moverse debe ir reseteando el canvas
     * y por ende volviendo a dibujar todo el tablero, fichas y la propia ficha que cae
    * */
    let yy =0;
    let interval;
    function comenzar_animacion(ficha_seleccionada, x, y){
        yy = y;
        let cae_hasta = ficha_seleccionada.getCoordenadaY();
        interval = setInterval(gravedad,60,ficha_seleccionada,x,cae_hasta);
    }
    function gravedad(ficha_seleccionada,x,cae_hasta){
        if(yy<cae_hasta){
            clearTablero();
            tablero.draw();
            ficha_seleccionada.setCoordenadaX(x);
            ficha_seleccionada.setCoordenadaY(yy);
            ficha_seleccionada.draw_image();
            yy+=50;
        }else{
            stop_interval(interval);
            clearTablero();
            tablero.draw();
        }
    }
    function stop_interval(i){
        clearInterval(i);
    }
    function clearCanvas(){
        ctx.clearRect(0, 0, 1660, 755);
    }
    function clearTablero(){
        ctx.clearRect(280, 0, 640, 640);
    }
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    function leer_mouse(ev){
        let ClientRect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / ClientRect.width;
        var scaleY = canvas.height / ClientRect.height;
        let x_mouse = (ev.clientX - ClientRect.left) * scaleX;
        let y_mouse = (ev.clientY - ClientRect.top) * scaleY;
    
        return {'x':x_mouse, 'y':y_mouse};
    }
    function cargar_grupos_fichas(cant_fichas_jugador, ctx, jugador1, jugador2){
        for(let o = 0; o < cant_fichas_jugador*2; o++){
            let ficha = new Ficha(radio, "", ctx, "white", 0, false);
            if(o%2==0){
                ficha.setFill("yellow");
                ficha.setImage("../TP3/uploads/"+img_ficha_j1);
                ficha.setJugador(1);
                jugador1.push(ficha);
            }else{
                ficha.setFill("red");
                ficha.setImage("../TP3/uploads/"+img_ficha_j2);
                ficha.setJugador(2);
                jugador2.push(ficha);
            }
        }
    }