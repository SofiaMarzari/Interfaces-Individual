let img_galeria_dinamica = document.getElementById('img_galeria_dinamica');
let cont_galeria = 0;
let paths_imagenes_galeria = ["uploads/mas_divertida_marco_1.png", "uploads/mas_divertida_marco_2.png", "uploads/mas_divertida_marco_3.png"];
let btn_hamburguesa = document.getElementById('btn-nav-hamburguesa');
let open_nav = false;
$(document).ready(function(){
    let logo_header = document.getElementById('logo_header');
    logo_header.classList.add("no-visible");

    /**************************Punto 8*************************************/
    let numbers_colors_all = document.querySelectorAll(".img-number-color");
    numbers_colors_all.forEach((number) => {
        number.addEventListener("mouseover", function(ev){/*Mouse entra al elemento (sobre) */
            ev.preventDefault();
            this.style.transform = "scale(1.2)";
        });
    });
    numbers_colors_all.forEach((number) => {
        number.addEventListener("mouseout", function(ev){/*Mouse sale del elemento */
            ev.preventDefault();
            this.style.transform = "scale(1)";
        });
    });
    /**************************fin - Punto 8*************************************/
    /**************************Punto 6*************************************/
    img_galeria_dinamica.src = paths_imagenes_galeria[0];
    setInterval(galeria_dinamica, 3000);
    /**************************fin - Punto 6*************************************/
});
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
    if(open_nav){
        linea1_hamburguesa.style.transform = "rotate(0deg)";
        linea2_hamburguesa.style.transform = "rotate(0deg)";
        linea2_hamburguesa.style.bottom = "0px";
        linea3_hamburguesa.style.transform = "rotate(0deg)";
        linea3_hamburguesa.style.bottom = "0px";
        open_nav = false;
    }else{
        linea1_hamburguesa.style.transform = "rotate(45deg)";
        linea2_hamburguesa.style.transform = "rotate(-45deg)";
        linea2_hamburguesa.style.bottom = "11px";
        linea3_hamburguesa.style.transform = "rotate(-45deg)";
        linea3_hamburguesa.style.bottom = "23px";
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
});