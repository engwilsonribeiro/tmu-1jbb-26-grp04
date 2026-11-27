
document.addEventListener("DOMContentLoaded", function () {

    const modeloSelect = document.getElementById("modelo");
    const nomePreview = document.getElementById("nomePreview");
    const tenisPreview = document.getElementById("tenisPreview");
    const botoesCor = document.querySelectorAll(".cor");
    const botaoSalvar = document.getElementById("salvar");
    const aviso = document.getElementById("aviso");

    let corSelecionada = "#852cfb";

    function alterarCor(cor) {

        corSelecionada = cor;

        if (tenisPreview) {
            const corpoTenis = tenisPreview.querySelector(".corpo-tenis");
            const bicoTenis = tenisPreview.querySelector(".bico");

            if (corpoTenis) {
                corpoTenis.style.backgroundColor = cor;
            }

            if (bicoTenis) {
                bicoTenis.style.backgroundColor = cor;
            }
        }

        botoesCor.forEach(function (botao) {
            botao.classList.remove("selecionada");
        });

        const botaoAtual = Array.from(botoesCor).find(function (botao) {
            return botao.dataset.cor.toLowerCase() === cor.toLowerCase();
        });

        if (botaoAtual) {
            botaoAtual.classList.add("selecionada");
        }
    }

    if (modeloSelect && nomePreview) {
        modeloSelect.addEventListener("change", function () {
            nomePreview.textContent = modeloSelect.value;
        });
    }

    botoesCor.forEach(function (botao) {
        botao.addEventListener("click", function () {
            alterarCor(botao.dataset.cor);
        });
    });

    const botoesModelo = document.querySelectorAll(".botao-card");

    botoesModelo.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const modeloEscolhido = botao.dataset.modelo;

            if (modeloSelect) {
                modeloSelect.value = modeloEscolhido;
            }

            if (nomePreview) {
                nomePreview.textContent = modeloEscolhido;
            }

            const personalizar = document.getElementById("personalizar");

            if (personalizar) {
                personalizar.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    if (botaoSalvar) {

        botaoSalvar.addEventListener("click", function () {

            const personalizacao = {
                modelo: modeloSelect.value,
                cor: corSelecionada
            };

            try {
                localStorage.setItem(
                    "sneakersToon",
                    JSON.stringify(personalizacao)
                );

                aviso.textContent = "Sua ideia foi salva com sucesso!";
                aviso.style.color = "#852cfb";

            } catch (erro) {
                aviso.textContent = "Não foi possível salvar sua ideia.";
                aviso.style.color = "red";
                console.error(erro);
            }
        });
    }

    try {

        const dadosSalvos = localStorage.getItem("sneakersToon");

        if (dadosSalvos) {

            const personalizacao = JSON.parse(dadosSalvos);

            if (personalizacao.modelo && modeloSelect) {

                const modeloExiste = Array.from(modeloSelect.options).some(
                    function (opcao) {
                        return opcao.value === personalizacao.modelo;
                    }
                );

                if (modeloExiste) {
                    modeloSelect.value = personalizacao.modelo;
                    nomePreview.textContent = personalizacao.modelo;
                }
            }

            if (personalizacao.cor) {
                const corExiste = Array.from(botoesCor).some(
                    function (botao) {
                        return botao.dataset.cor.toLowerCase() ===
                            personalizacao.cor.toLowerCase();
                    }
                );

                if (corExiste) {
                    alterarCor(personalizacao.cor);
                }
            }
        }

    } catch (erro) {
        console.log("Erro ao recuperar personalização:", erro);
    }

    const formContato = document.getElementById("formContato");
    const avisoContato = document.getElementById("avisoContato");

    if (formContato) {

        formContato.addEventListener("submit", function (evento) {

            evento.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            if (!nome || !email || !mensagem) {

                avisoContato.textContent =
                    "Preencha todos os campos antes de enviar.";

                avisoContato.style.color = "red";
                return;
            }

            avisoContato.textContent =
                "Obrigado, " + nome + "! Sua mensagem foi preenchida com sucesso.";

            avisoContato.style.color = "#852cfb";

            formContato.reset();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (evento) {

            const destino = document.querySelector(
                link.getAttribute("href")
            );

            if (destino) {
                evento.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    alterarCor(corSelecionada);

    console.log("Sneakers Toon carregada com sucesso!");

});
