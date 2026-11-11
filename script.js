// =====================================================
// 1. SELEÇÃO DOS ELEMENTOS DA PÁGINA
// =====================================================

// Seleciona todos os links da navegação de categorias
const linksCategorias = document.querySelectorAll(
    ".navegacao-categorias a"
);

// Seleciona todas as seções de categorias
const secoesCategorias = document.querySelectorAll(
    ".categoria"
);

// Seleciona o botão de voltar ao topo
const botaoVoltarTopo = document.querySelector(
    ".botao-voltar-topo"
);


// =====================================================
// 2. NAVEGAÇÃO ENTRE AS CATEGORIAS
// =====================================================

linksCategorias.forEach(function (link) {
    link.addEventListener("click", function (evento) {
        // Impede o comportamento padrão imediato do link
        evento.preventDefault();

        // Obtém o valor do atributo href.
        // Exemplo: "#hamburgueres"
        const idDaSecao = link.getAttribute("href");

        // Localiza a seção correspondente
        const secaoDestino = document.querySelector(idDaSecao);

        // Se a seção existir, rola suavemente até ela
        if (secaoDestino) {
            secaoDestino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        // Remove o destaque de todos os links
        linksCategorias.forEach(function (outroLink) {
            outroLink.classList.remove("categoria-ativa");
        });

        // Destaca o link que foi tocado
        link.classList.add("categoria-ativa");
    });
});


// =====================================================
// 3. IDENTIFICAR A CATEGORIA VISÍVEL
// =====================================================

/*
   O IntersectionObserver observa as seções enquanto
   o usuário rola a página.
*/

const observadorDeSecoes = new IntersectionObserver(
    function (secoesObservadas) {
        secoesObservadas.forEach(function (secaoObservada) {
            if (secaoObservada.isIntersecting) {
                const idDaSecao = secaoObservada.target.getAttribute("id");

                linksCategorias.forEach(function (link) {
                    link.classList.remove("categoria-ativa");

                    if (link.getAttribute("href") === `#${idDaSecao}`) {
                        link.classList.add("categoria-ativa");
                    }
                });
            }
        });
    },
    {
        threshold: 0.25
    }
);

// Começa a observar cada seção de categoria
secoesCategorias.forEach(function (secao) {
    observadorDeSecoes.observe(secao);
});


// =====================================================
// 4. BOTÃO VOLTAR AO TOPO
// =====================================================

window.addEventListener("scroll", function () {
    /*
       O botão aparece depois que o usuário rolar
       mais de 400 pixels.
    */

    if (window.scrollY > 400) {
        botaoVoltarTopo.classList.add("botao-visivel");
    } else {
        botaoVoltarTopo.classList.remove("botao-visivel");
    }
});
