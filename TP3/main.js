function load_main(){
    let canvas = document.getElementById('myCanvas');
   // canvas.width = 1320/*screen.width*/;
   // canvas.height = 755;
    //si es 6 en linea:
    //canvas.height = 855;
    let ctx = canvas.getContext("2d");
    /************************************************************************* */
    var jugador1 = [];
    var jugador2 = [];
    var ficha_seleccionada = null;
    var press = false;
    let opcion_cantidad_linea = 4; //default
    let radio,espacio,suma_x,suma_y;
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
    let filas_tablero = opcion_cantidad_linea+2;
    let columnas_tablero = opcion_cantidad_linea+3;
    let cant_fichas_jugador = (filas_tablero*columnas_tablero)/2/*cantidad_fichas(opcion_cantidad_linea, filas_tablero, columnas_tablero)*/;
    let img_seleccionada;
    let press_ficha_j1,press_ficha_j2=false;
    let data_width_tablero = 670;
    let data_height_tablero = 570;
    var tablero = new Tablero(ctx, "../TP3/tablero_1.jpg", columnas_tablero, filas_tablero, radio, espacio, data_width_tablero, data_height_tablero, suma_x, suma_y);
    tablero.inicializar_matriz();
    tablero.draw();
    cargar_grupos_fichas(cant_fichas_jugador, ctx, jugador1, jugador2);
    dibujar_fichas_jugador(jugador1,75);
    dibujar_fichas_jugador(jugador2,1100);
    /******************************************************************************** */
    canvas.addEventListener('dragover', function(ev){
        ev.preventDefault(c);
    });

    canvas.addEventListener('mousedown', function(ev){
        ev.preventDefault();
        let data = leer_mouse(ev, canvas);
        for(j = 0; j < jugador1.length; j++){
            if(jugador1[j].isPointInside(data.x, data.y)){
                ficha_seleccionada = jugador1[j];
                press_ficha_j1=true;
                press = true;
                break;
            }
            if(ficha_seleccionada != null){
                break;
            }
        }
        for(j = 0; j < jugador2.length; j++){
            if(jugador2[j].isPointInside(data.x, data.y)){
                ficha_seleccionada = jugador2[j];
                press_ficha_j2=true;
                press = true;
                break;
            }
            if(ficha_seleccionada != null){
                break;
            }
        }
    });
    canvas.addEventListener('mousemove', function(ev){
        ev.preventDefault();
        if(press){
            if(ficha_seleccionada != null){
                let data = leer_mouse(ev, canvas);
                ficha_seleccionada.setCoordenadaX(data.x);
                ficha_seleccionada.setCoordenadaY(data.y);
                clearCanvas(ctx);
                tablero.draw();
                ficha_seleccionada.draw_image();
            }
        }
    });
    canvas.addEventListener('mouseup', function(ev){
        ev.preventDefault();
        if(press){
            let data = leer_mouse(ev, canvas);
            if(press_ficha_j1){
                img_seleccionada = jugador1[0].getImage();
            }else if(press_ficha_j2){
                img_seleccionada = jugador2[0].getImage();
            }
            comenzar_animacion(ficha_seleccionada, data.x, data.y,ctx,tablero,jugador1,jugador2);
            tablero.cargar_ficha_en_tablero(data.x, data.y, img_seleccionada);
           
            if(press_ficha_j1){
                jugador1.pop();
            }else if(press_ficha_j2){
                jugador2.pop();
            }
            dibujar_fichas_jugador(jugador1,75);
            dibujar_fichas_jugador(jugador2,1100);
            //chequear si existe ganador en esta ronda...
            if(tablero.hay_ganador()){
        
            }
            //tablero.recorrer_matriz();
            press=false;
            ficha_seleccionada = null;
            press_ficha_j1=false;
            press_ficha_j2=false;
        }
    });
}
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
    let yy =0;
    function comenzar_animacion(ficha_seleccionada, x, y, ctx,tablero,j1,j2){
        yy = y;
        setInterval(gravedad,50,ficha_seleccionada,x,ctx,tablero,j1,j2);
    }
    function gravedad(ficha_seleccionada,x, ctx,tablero,j1,j2){
        if(yy<570){
            clearCanvas(ctx);
            tablero.draw();
            ficha_seleccionada.setCoordenadaX(x);
            ficha_seleccionada.setCoordenadaY(yy);
            ficha_seleccionada.draw_image();
            yy+=50;
        }
        dibujar_fichas_jugador(j1,75);
        dibujar_fichas_jugador(j2,1100);
    }
    function clearCanvas(ctx){
        ctx.clearRect(0, 0, 1660, 755);
    }
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    function leer_mouse(ev, canvas){
        let ClientRect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / ClientRect.width;
        var scaleY = canvas.height / ClientRect.height;
        let x_mouse = (ev.clientX - ClientRect.left) * scaleX;
        let y_mouse = (ev.clientY - ClientRect.top) * scaleY;
    
        return {'x':x_mouse, 'y':y_mouse};
    }
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
    }
    function cargar_grupos_fichas(cant_fichas_jugador, ctx, jugador1, jugador2){
        for(let o = 0; o < cant_fichas_jugador; o++){
            let ficha = new Ficha(40, "../TP3/fichaAngel.svg", ctx, "white");
            jugador1.push(ficha);
        }
        for(let o = 0; o < cant_fichas_jugador; o++){
            let ficha = new Ficha(40, "../TP3/fichaDemonio.svg", ctx, "white");
            jugador2.push(ficha);
        }
    }