/* Carregador do Header e Footer */
async function loadLayout() {
    const headerDiv = document.getElementById("header");
    const footerDiv = document.getElementById("footer");

    if (headerDiv) {
        const header = await fetch("header.html").then(res => res.text());
        headerDiv.innerHTML = header;

        headerDiv.querySelectorAll(".desativado").forEach(el => {
            el.classList.remove("desativado");
            el.classList.add("ativado");
        });
    }

    if (footerDiv) {
        const footer = await fetch("footer.html").then(res => res.text());
        footerDiv.innerHTML = footer
    }
}


document.addEventListener("DOMContentLoaded", function() {
    loadLayout();
    
    /* Inicializador de animação das divs */
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("desativado");
                entry.target.classList.add("ativado");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const divsParaAnimar = document.querySelectorAll(".desativado");

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