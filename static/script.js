/* Contador Números */
document.addEventListener("DOMContentLoaded", function() {

    /* Inicializador de animação das divs */
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("desativo");
                entry.target.classList.add("ativo");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const divsParaAnimar = document.querySelectorAll(".desativo");

    divsParaAnimar.forEach(div => {
        observer.observe(div);
    });

    /* Contador de Números*/
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