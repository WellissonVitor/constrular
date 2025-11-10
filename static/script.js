document.addEventListener("DOMContentLoaded", function() {    

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

    // Observa as divs iniciais
    document.querySelectorAll(".desativado").forEach(div => observer.observe(div));

    /* Carregador do Header, Footer */
    async function loadLayout() {
        const headerDiv = document.getElementById("header");
        const footerDiv = document.getElementById("footer");

        if (headerDiv) {
            const header = await fetch("header.html").then(res => res.text());
            headerDiv.innerHTML = header;
        }

        if (footerDiv) {
            const footer = await fetch("footer.html").then(res => res.text());
            footerDiv.innerHTML = footer;
        }

        // Reaplica o observer em elementos carregados dinamicamente
        requestAnimationFrame(() => {
            document.querySelectorAll(".desativado").forEach(div => observer.observe(div));
        });
    }

    loadLayout();

    /* Contador de Números */
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

    /* Clique catálogo - Carrega o catálogo conforme o ícone clicado */
    async function carregador_catalogo(iconId) {
        const catalogoDiv = document.getElementById("catalogo");

        if (catalogoDiv) {
            const divHTML = iconId + ".html";
            const catalogo = await fetch(divHTML).then(res => res.text());
            catalogoDiv.innerHTML = catalogo;

            requestAnimationFrame(() => {
                const animatableDivs = catalogoDiv.querySelectorAll(".desativado");
                animatableDivs.forEach(div => observer.observe(div));
            });
        }

        /* Observador do Catálogo (scroll interno) */
        const divScroll = document.getElementById(".catalogo-itens");
        const catalogo_observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll(".selecionado").forEach(el => {
                        el.classList.remove("selecionado");
                        el.classList.add("desselecionado");
                    });

                    if (entry.target.classList.contains("blocos")) {
                        document.querySelector(".bloco.titulo").classList.replace("desselecionado", "selecionado");
                        document.querySelector(".bloco.texto").classList.replace("desselecionado", "selecionado");
                    }
                    else if (entry.target.classList.contains("cobogos")) {
                        document.querySelector(".cobogo.titulo").classList.replace("desselecionado", "selecionado");
                        document.querySelector(".cobogo.texto").classList.replace("desselecionado", "selecionado");
                    }
                    else if (entry.target.classList.contains("ladrilhos")) {
                        document.querySelector(".ladrilho.titulo").classList.replace("desselecionado", "selecionado");
                        document.querySelector(".ladrilho.texto").classList.replace("desselecionado", "selecionado");
                    }
                    else if (entry.target.classList.contains("pre-moldados")) {
                        document.querySelector(".pre-moldado.titulo").classList.replace("desselecionado", "selecionado");
                        document.querySelector(".pre-moldado.texto").classList.replace("desselecionado", "selecionado");
                    }
                }
            });
        }, { root: divScroll, threshold: 1 });

        document.querySelectorAll(".blocos, .cobogos, .ladrilhos, .pre-moldados").forEach(div => catalogo_observer.observe(div));
    }

    const catalogoIcon = document.querySelectorAll(".catalogo-icon");

    catalogoIcon.forEach(icon => {
        icon.addEventListener("click", function() {
            document.querySelectorAll(".catalogo-icon").forEach(el => {
                el.classList.remove("icon-selecionado");
            });
            icon.classList.add("icon-selecionado");
            carregador_catalogo(icon.id);
        });
    });
});