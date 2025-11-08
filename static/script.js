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

    /* Observador Catalogo - Muda titulo e descrição do catalogo */
    const divScroll = document.querySelector(".catalogo-itens");

    const catalogo_observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll(".selecionado").forEach(el => {
                    el.classList.remove("selecionado");
                    el.classList.add("desselecionado");
                });

                if (entry.target.classList.contains("blocos")) {
                    document.querySelector(".bloco.titulo").classList.remove("desselecionado");
                    document.querySelector(".bloco.titulo").classList.add("selecionado");

                    document.querySelector(".bloco.texto").classList.remove("desselecionado");
                    document.querySelector(".bloco.texto").classList.add("selecionado");
                }
                else if (entry.target.classList.contains("cobogos")) {
                    document.querySelector(".cobogo.titulo").classList.remove("desselecionado");
                    document.querySelector(".cobogo.titulo").classList.add("selecionado");

                    document.querySelector(".cobogo.texto").classList.remove("desselecionado");
                    document.querySelector(".cobogo.texto").classList.add("selecionado");
                }
                else if (entry.target.classList.contains("ladrilhos")) {
                    document.querySelector(".ladrilho.titulo").classList.remove("desselecionado");
                    document.querySelector(".ladrilho.titulo").classList.add("selecionado");

                    document.querySelector(".ladrilho.texto").classList.remove("desselecionado");
                    document.querySelector(".ladrilho.texto").classList.add("selecionado");
                }
                else if (entry.target.classList.contains("pre-moldados")) {
                    document.querySelector(".pre-moldado.titulo").classList.remove("desselecionado");
                    document.querySelector(".pre-moldado.titulo").classList.add("selecionado");

                    document.querySelector(".pre-moldado.texto").classList.remove("desselecionado");
                    document.querySelector(".pre-moldado.texto").classList.add("selecionado");
                }
            }
        });
    }, 
    { 
        root: divScroll,
        threshold: 1
    });

    const divsParaObservar = document.querySelectorAll(".blocos, .cobogos, .ladrilhos, .pre-moldados");

    divsParaObservar.forEach(div => {
        catalogo_observer.observe(div);
    });
});