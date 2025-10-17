/* Slide automático em "conteúdo" */
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide li");
    let current_slide = 0;

    function change_slide() {
        slides[current_slide].classList.remove("li-active");
        current_slide = (current_slide + 1) % slides.length;
        slides[current_slide].classList.add("li-active");
    }

    setInterval(change_slide, 3000);
})

/* Contador Números */
document.addEventListener("DOMContentLoaded", function() {
    const elementos = document.querySelectorAll(".num");

    elementos.forEach((elemento) => {
        elemento.addEventListener("animationend", function() {
            const contadorEl = elemento.querySelector(".contador");
            contador(contadorEl);
        });
    });

    function contador(elemento) {
        const valor_total = parseInt(elemento.getAttribute("data-total"));
        const duracao = 3000;
        const atualizacao = 16;
        const total_passos = duracao / atualizacao;
        let valor_inicial = 0;
        const incremento = valor_total / total_passos;

        const intervalo = setInterval(() => {
            valor_inicial += incremento;
            const valor_atual = Math.round(valor_inicial);
            elemento.textContent = valor_atual;

            if (valor_atual >= valor_total) {
                elemento.textContent = valor_total;
                clearInterval(intervalo);
            }
        }, atualizacao);
    }
});