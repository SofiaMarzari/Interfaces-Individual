$(document).ready(function(){
    let logo_header = document.getElementById('logo_header');
    logo_header.classList.add("no-visible");
});
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
});