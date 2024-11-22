let img_galeria_dinamica = document.getElementById('img_galeria_dinamica');
let img_galeria_amigos = document.getElementById('img_galeria_amigos');
let container_galeria_lateral = document.getElementById('container_galeria_lateral');
let cont_galeria = 0;
let paths_imagenes_galeria = ["uploads/mas_divertida_marco_1.png", "uploads/mas_divertida_marco_2.png", "uploads/mas_divertida_marco_3.png"];
let paths_imagenes_galeria_lateral = ["uploads/rojo_uno.png", "uploads/naranja_dos.png", "uploads/3.png", "uploads/verde_cuatro.png", "uploads/azul_cinco.png", "uploads/violeta_6.png", "uploads/7.png", "uploads/rosa_ocho.png", "uploads/gris_nueve.png", "uploads/blanco_diez.png"];
let btn_hamburguesa = document.getElementById('btn-nav-hamburguesa');
let open_nav = false;

let iframe_home_video = document.getElementById('iframe-video-home');
let imagen_home_video = document.getElementById('imagen_home_video');
let video_home_marco = document.getElementById('video_home_marco');
let personaje_video = document.querySelector(".img_numero_video_seccion");
let interval_loader;
let width_carga = 0;
let contenedor_loader = document.getElementById("contenedor_load");
let barra_loader = document.getElementById("barra_loader");
document.addEventListener('DOMContentLoaded', function(){
    /**************************Punto 1********************************/
    interval_loader = setInterval(loadTimer, 70);//ACA
    /**************************fin - Punto 1********************************/
    let logo_header = document.getElementById('logo_header');
    logo_header.classList.add("no-visible");

    /**************************Punto 12*************************************/
    let numbers_colors_all = document.querySelectorAll(".img-number-color");
    numbers_colors_all.forEach((number) => {
        number.addEventListener("mouseover", function(ev){/*Mouse entra al elemento (sobre) */
            ev.preventDefault();
            this.style.transform = "scale(1.2)";
            this.parentElement.style.boxShadow = "1px 1px 70px 1px #fbf9edd1 inset";
        });
    });
    numbers_colors_all.forEach((number) => {
        number.addEventListener("mouseout", function(ev){/*Mouse sale del elemento */
            ev.preventDefault();
            this.style.transform = "scale(1)";
            this.parentElement.style.boxShadow = "1px 1px 70px 1px #3f3f3f inset";
        });
    });
    /**************************fin - Punto 12*************************************/
    /**************************Punto 6*************************************/
    img_galeria_dinamica.src = paths_imagenes_galeria[0];
    setInterval(galeria_dinamica, 3000);
    /**************************fin - Punto 6*************************************/
    container_galeria_lateral.innerHTML = '<img id="img_galeria_amigos" src="'+paths_imagenes_galeria_lateral[0]+'" alt="">';
    /**************************Punto 10A********************************/
    let iframe_home_video = document.getElementById('iframe-video-home');
    iframe_home_video.classList.add('no-visible');
    let btn_play_video_home = document.getElementById('btn-play-video-home');
    btn_play_video_home.addEventListener('click', function(event){
        iframe_home_video.classList.remove('no-visible');
        iframe_home_video.classList.add('visible');
        imagen_home_video.classList.add('no-visible');
        iframe_home_video.setAttribute('src', iframe_home_video.getAttribute('src')+'?autoplay=1');
        this.classList.add('no-visible');
    });
   /**************************fin - Punto 10A********************************/
});
/**************************Punto 1********************************/
function loadTimer(){
    if (width_carga >= 100) {
        clearInterval(interval_loader);
        contenedor_loader.style.visibility = "hidden";
      } else {
        width_carga++; 
        barra_loader.style.width = width_carga + '%'; 
        /*porcentaje_loader.innerHTML = width_carga * 1  + '%';*/
      }
}
/**************************fin - Punto 1********************************/
/**************************Punto 6*************************************/
function galeria_dinamica(){
    if(cont_galeria == paths_imagenes_galeria.length-1){
        cont_galeria = 0;
    }else{
        cont_galeria++;
    }
    img_galeria_dinamica.src = paths_imagenes_galeria[cont_galeria];
}
/**************************fin - Punto 6*************************************/ 
/**************************Punto 2*************************************/
btn_hamburguesa.addEventListener('click', function(){
    let linea1_hamburguesa = document.getElementById('linea1_hamburguesa');
    let linea2_hamburguesa = document.getElementById('linea2_hamburguesa');
    let linea3_hamburguesa = document.getElementById('linea3_hamburguesa');
    let nav = document.getElementById('nav');
    if(open_nav){
        linea1_hamburguesa.style.transform = "rotate(0deg)";
        linea2_hamburguesa.style.transform = "rotate(0deg)";
        linea2_hamburguesa.style.bottom = "0px";
        linea3_hamburguesa.style.transform = "rotate(0deg)";
        linea3_hamburguesa.style.bottom = "0px";
        this.style.transform = "translateX(0)";
        open_nav = false;
        nav.style.visibility = "hidden";
        /*LI del NAV*/
        document.querySelectorAll(".li_nav_principal").forEach((li) => {
            li.style.visibility = "hidden";
            li.style.backgroundColor = "#00D1D500";
            /*li.style.transform = "rotate(90deg) translate(90px, 140px)";*/
            li.style.transform = "skewX(1deg) scale(0, 0)";
        });
    }else{
        linea1_hamburguesa.style.transform = "rotate(45deg)";
        linea2_hamburguesa.style.transform = "rotate(-45deg)";
        linea2_hamburguesa.style.bottom = "11px";
        linea3_hamburguesa.style.transform = "rotate(-45deg)";
        linea3_hamburguesa.style.bottom = "23px";
        this.style.transform = "translateX(-80px)";
        nav.style.visibility = "visible";
        /*LI del NAV*/
        document.querySelectorAll(".li_nav_principal").forEach((li) => {
            li.style.visibility = "visible";
            li.style.backgroundColor = "#00D1D5";
            /*li.style.transform = "rotate(0deg) translate(0px, 0px)";*/
            li.style.transform = "skewX(1deg) scale(1, 1)";
        });
        open_nav = true;
    }
});
/**************************fin - Punto 2*************************************/ 
document.addEventListener('scroll', function(ev){
    /**************************Punto 1*************************************/
    let header = document.getElementById("header");
    let header_top = header.offsetTop;
    if(window.scrollY >= header_top){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }

    let btn_comprar = document.getElementById('btn-comprar');
    let logo_inicio = document.getElementById('logo_inicio');
    if(window.scrollY >= 150){
        logo_inicio.classList.remove("animacion_agrandar");
        logo_inicio.classList.add("animacion_reducir");
        btn_comprar.style.width = "150px";
        btn_comprar.style.height = "40px";
        btn_comprar.style.fontSize = "16px";
    }else{
        logo_inicio.classList.remove("animacion_reducir");
        logo_inicio.classList.add("animacion_agrandar");
        btn_comprar.style.width = "200px";
        btn_comprar.style.height = "50px";
        btn_comprar.style.fontSize = "20px";
    }
    /**************************fin - Punto 1*************************************/
    /**************************Punto 4********************************/
    let div_fondo_inicio = document.querySelector(".div_fondo_inicio");
    let div_a_inicio = document.querySelector(".div_a_inicio");
    let div_c_inicio = document.querySelector(".div_c_inicio");
    if (window.scrollY >= 30) {
        div_a_inicio.style.transform = "translateY(50px)";
        div_c_inicio.style.transform = "translateY(50px)";
        div_fondo_inicio.style.transform = "translateY(-40px)";
    } else {
        div_a_inicio.style.transform = "translateY(0px)";
        div_c_inicio.style.transform = "translateY(0px)";
        div_fondo_inicio.style.transform = "translateY(0px)";
    }
    /**************************fin - Punto 4********************************/
    /**************************Punto 5*************************************/
    let number_5_divertido = document.getElementById('mas_divertida_number_5');
    let number_4_divertido = document.getElementById('mas_divertida_number_4');
    let marco_divertida = document.getElementById('mas_divertida_marco');
    if(window.scrollY >= 1000){
        number_5_divertido.style.transform = "translateY(-30px)";
        marco_divertida.style.transform = "translateY(-50px)";
    }else{
        number_5_divertido.style.transform = "translateY(60px)";
        marco_divertida.style.transform = "translateY(-20px)";
    }
    if(window.scrollY >= 1350){
        number_4_divertido.style.transform = "rotateY(150deg) translateY(-40px)";
    }else{
        number_4_divertido.style.transform = "rotateY(150deg) translateY(40px)";
    }
    /**************************fin - Punto 5*************************************/
    /**************************Punto 7*************************************/
    let cards = document.querySelectorAll(".container_card");
    if(window.scrollY >= 1600){
        for(let i = 0; i < 3; i++){
            cards[i].classList.add("container_card_animate"+(i+1));
        }
    }else{
        for(let i = 0; i < 3; i++){
            cards[i].classList.remove("container_card_animate"+(i+1));
        }
    }
    /**************************fin - Punto 7*************************************/
    /**************************Punto 9*************************************/
    let container_galeria_lateral = document.getElementById('container_galeria_lateral');
    if(window.scrollY >= 4300){
       container_galeria_lateral.innerHTML = '<img id="img_galeria_amigos" src="'+paths_imagenes_galeria_lateral[0]+'" alt="">';
       //container_galeria_lateral.children[0].classList.add("animate_general_lateral");
    }
    if(window.scrollY >= 4560){
        container_galeria_lateral.innerHTML = '<img id="img_galeria_amigos" src="'+paths_imagenes_galeria_lateral[1]+'" alt="">';
        //container_galeria_lateral.children[0].classList.add("animate_general_lateral");
    }
    if(window.scrollY >= 5140){
        container_galeria_lateral.innerHTML = '<img style="width:40%;" id="img_galeria_amigos" src="'+paths_imagenes_galeria_lateral[2]+'" alt="">';
        //container_galeria_lateral.children[0].classList.add("animate_general_lateral");
    }
    if(window.scrollY >= 5490){
        container_galeria_lateral.innerHTML = '<img id="img_galeria_amigos" src="'+paths_imagenes_galeria_lateral[3]+'" alt="">';
        //container_galeria_lateral.children[0].classList.add("animate_general_lateral");
    }
    if(window.scrollY >= 6290){
        container_galeria_lateral.innerHTML = '<img id="img_galeria_amigos" src="'+paths_imagenes_galeria_lateral[4]+'" alt="">';
        //container_galeria_lateral.children[0].classList.add("animate_general_lateral");
    }
    if(window.scrollY >= 6490){
        container_galeria_lateral.innerHTML = '<img id="img_galeria_amigos" src="'+paths_imagenes_galeria_lateral[5]+'" alt="">';
        //container_galeria_lateral.children[0].classList.add("animate_general_lateral");
    }
    if(window.scrollY >= 6990){
        container_galeria_lateral.innerHTML = '<img style="width:30%;" id="img_galeria_amigos" src="'+paths_imagenes_galeria_lateral[6]+'" alt="">';
        //container_galeria_lateral.children[0].classList.add("animate_general_lateral");
    }
    if(window.scrollY >= 7490){
        container_galeria_lateral.innerHTML = '<img id="img_galeria_amigos" src="'+paths_imagenes_galeria_lateral[7]+'" alt="">';
        //container_galeria_lateral.children[0].classList.add("animate_general_lateral");
    }
    if(window.scrollY >= 7990){
        container_galeria_lateral.innerHTML = '<img id="img_galeria_amigos" src="'+paths_imagenes_galeria_lateral[8]+'" alt="">';
        //container_galeria_lateral.children[0].classList.add("animate_general_lateral");
    }
    if(window.scrollY >= 8490){
        container_galeria_lateral.innerHTML = '<img id="img_galeria_amigos" src="'+paths_imagenes_galeria_lateral[9]+'" alt="">';
        //container_galeria_lateral.children[0].classList.add("animate_general_lateral");
    }
    /**************************fin - Punto 9*************************************/
    /**************************Punto 10B********************************/
    if(window.scrollY <= 10100){
        video_home_marco.style.transform = "translateX(-150px)";
        personaje_video.style.transform = "translateY(450px)";
    }
    if(window.scrollY >= 10100){
        video_home_marco.style.transform = "translateX(0px)";
        personaje_video.style.transform = "translateY(0px)";
    }
    if(window.scrollY >= 11330){
        video_home_marco.style.transform = "translateX(-150px)";
    }
    if(window.scrollY >= 11840){
        personaje_video.style.transform = "translateY(450px)";
    }
    /**************************fin - Punto 10B********************************/
});