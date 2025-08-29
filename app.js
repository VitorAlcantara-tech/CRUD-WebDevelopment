let atletas = [
    {
        "nome": "Andressa Alves",
        "posicao": "Meio-campo",
        "clube": "Corinthians",
        "foto": "https://example.com/andressa.jpg",
        "gols": 15,
        "assistencias": 10,
        "jogos": 28,
        "favorita": false
    },
    {
        "nome": "Dayana Rodríguez",
        "posicao": "Meio-campo",
        "clube": "Corinthians",
        "foto": "https://example.com/dayana.jpg",
        "gols": 5,
        "assistencias": 12,
        "jogos": 30,
        "favorita": false
    },
    {
        "nome": "Mariza",
        "posicao": "Zagueira",
        "clube": "Corinthians",
        "foto": "https://example.com/mariza.jpg",
        "gols": 2,
        "assistencias": 1,
        "jogos": 32,
        "favorita": false
    },
    {
        "nome": "Thaís Regina",
        "posicao": "Zagueira",
        "clube": "Corinthians",
        "foto": "https://example.com/thais.jpg",
        "gols": 1,
        "assistencias": 2,
        "jogos": 25,
        "favorita": false
    },
    {
        "nome": "Letícia Teles",
        "posicao": "Zagueira",
        "clube": "Corinthians",
        "foto": "https://example.com/leticia.jpg",
        "gols": 0,
        "assistencias": 0,
        "jogos": 18,
        "favorita": false
    }
]

// Inicialização
window.onload = function () {
    carregarAtletasLocalStorage();
    criarCards();


    document.getElementById("search").addEventListener("input", buscarPeloNomeOuPosicao);
    document.getElementById("cardForm").addEventListener("submit", addCards);
    document.getElementById("cardsList").addEventListener("click", handleClick);
    document.getElementById("filtroClube").addEventListener("change", filtrarPorClubes);
    document.getElementById("ordenarNome", "ordenarPosicao").addEventListener("click", ordernar);
}

// Evento de clique para editar e apagar cards
const handleClick = (infosDoEvento) => {
    const acaoBtn = infosDoEvento.target.dataset.action;
    const indexCard = infosDoEvento.target.dataset.index;

    if (!acaoBtn) return;

    if (acaoBtn === "Editar") {
        editarCards(indexCard)
    }
    else if (acaoBtn === "Apagar") {
        apagarCards(indexCard)
    }
    else if (acaoBtn === "Favoritar") {
        favoritarCards(indexCard)
    }
}



//Função cria os cards dos atletas
function criarCards() {
    const cardsList = document.getElementById("cardsList");
    cardsList.innerHTML = ""; // Limpa o container antes de adicionar novos cards

    atletas.forEach((pegaCard, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card__atleta');

        cardElement.dataset.nome = pegaCard.nome;
        cardElement.dataset.posicao = pegaCard.posicao
        cardElement.dataset.clube = pegaCard.clube


        cardElement.innerHTML = `
        ${pegaCard.foto ? `<img src="${pegaCard.foto}" alt="Imagem da ${pegaCard.nome}" style="max-width:200px;">` : ""}
        <h3>${pegaCard.nome}</h3>
        <p>Posição: ${pegaCard.posicao}</p>
        <p>Clube: ${pegaCard.clube}</p>
        <p>Gols: ${pegaCard.gols}</p>
        <p>Assistências: ${pegaCard.assistencias}</p>
        <p>Jogos: ${pegaCard.jogos}</p>
        <button data-action="Editar" data-index=${index}><i class="fa-solid fa-pen"></i> Editar</button>
        <button data-action="Apagar" data-index=${index}><i class="fa-solid fa-user-minus"></i> Remover</button>
        <button data-action="Favoritar" data-index=${index} style="background: none; color: gold; font-size:20px;"><i class="fa-regular fa-star" data-action="Favoritar" data-index=${index}></i></button>`;

        cardsList.append(cardElement);
    })

    atualizarFiltroClubes();
    
}

// Função para salvar atletas no Local Storage
const salvarLocalStorage = () => {
    localStorage.setItem("atletas", JSON.stringify(atletas))
}

// Função para carregar atletas do Local Storage
const carregarAtletasLocalStorage = () => {
    const atletasGuardados = localStorage.getItem("atletas")

    if (atletasGuardados) {
        atletas = JSON.parse(atletasGuardados)
        console.log("Atletas carregados do Local Storage:", atletas);
    }
}



// Função para adicionar novas atletas
function addCards(e) {
    e.preventDefault();

    const name = document.querySelector("#cardName").value;
    const position = document.querySelector("#cardPosition").value;
    const image = document.querySelector("#cardImage").value;
    const club = document.querySelector("#cardClub").value;
    const goals = document.querySelector("#cardGols").value;
    const assistance = document.querySelector("#cardAssistencias").value;
    const matches = document.querySelector("#cardJogos").value;


    const cardNovo = {
        "nome": name,
        "posicao": position,
        "clube": club,
        "foto": image,
        "gols": goals,
        "assistencias": assistance,
        "jogos": matches,
        "favorita": false
    }

    atletas.unshift(cardNovo);
    salvarLocalStorage();

    document.querySelector('#cardForm').reset();
    criarCards();
    alert("Jogadora adicionada com sucesso!");

}

// Função para apagar, editar e favoritar cards

function apagarCards(indexCard) {
    const confirmar = confirm("Tem certeza que deseja apagar esta jogadora?");

    if (confirmar) {
        atletas.splice(indexCard, 1);
        criarCards();
        alert("Jogadora removida com sucesso!");
    }
}

function editarCards(indexCard) {
    const novoNome = prompt("Digite o novo nome do atleta:", atletas[indexCard].nome);
    const novaPosicao = prompt("Digite a nova posição do atleta:", atletas[indexCard].posicao);
    const novoClube = prompt("Digite o novo clube do atleta:", atletas[indexCard].clube);
    const novaFoto = prompt("Digite a nova URL da foto do atleta:", atletas[indexCard].foto);
    const novosGols = prompt("Digite o novo número de gols do atleta:", atletas[indexCard].gols);
    const novasAssistencias = prompt("Digite o novo número de assistências do atleta:", atletas[indexCard].assistencias);
    const novosJogos = prompt("Digite o novo número de jogos do atleta:", atletas[indexCard].jogos);

    atletas[indexCard].nome = novoNome;
    atletas[indexCard].posicao = novaPosicao;
    atletas[indexCard].clube = novoClube;
    atletas[indexCard].foto = novaFoto;
    atletas[indexCard].gols = novosGols;
    atletas[indexCard].assistencias = novasAssistencias;
    atletas[indexCard].jogos = novosJogos;
    criarCards();
    salvarLocalStorage();
    alert("Jogadora editada com sucesso!");
}

function favoritarCards(indexCard) {
    const estadoAtual = atletas[indexCard].favorita;
    atletas[indexCard].favorita = !estadoAtual;

    const btn = document.querySelector(`button[data-action="Favoritar"][data-index="${indexCard}"]`);
    const icon = btn.querySelector("i");

    if (atletas[indexCard].favorita) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
    }

    salvarLocalStorage();
    console.log("Favoritar funcionou");
}

// Função de busca
function buscarPeloNomeOuPosicao() {
    const norm = (s) => (s || "")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .trim();

    const buscar = document.getElementById("search");
    const cards = document.querySelectorAll(".card__atleta");

    const filtrar = () => {
        const filtro = norm(buscar.value);
        cards.forEach(card => {
            const nome = norm(card.dataset.nome);
            const posicao = norm(card.dataset.posicao);

            const match = !filtro || nome.includes(filtro) || posicao.includes(filtro);
            card.hidden = !match;
        });
    };
    buscar.addEventListener("input", filtrar);
    console.log("Buscar funcionou");
}


// Função para atualizar o filtro de clubes
function atualizarFiltroClubes() {
    const norm = (s) => (s || "")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .trim();
    const sel = document.getElementById("filtroClube");
    if (!sel) return;

    const valorAtual = sel.value;
    // colete clubes únicos a partir do array atletas
    const clubes = Array.from(new Set(
        atletas
            .map(a => (a.clube || "").trim())
            .filter(Boolean)
    ));
    // ordena de forma case/acento-insensitive
    clubes.sort((a, b) => norm(a).localeCompare(norm(b)));

    sel.innerHTML = `<option value="">Todos os clubes</option>` +
        clubes.map(c => `<option value="${c}">${c}</option>`).join("");

    // mantém a seleção anterior se ainda existir
    if (valorAtual && clubes.includes(valorAtual)) sel.value = valorAtual;
}

// Função para filtrar por clubes
function filtrarPorClubes() {
    let valorOption = document.getElementById("filtroClube").value;
    const cards = document.querySelectorAll(".card__atleta");

    cards.forEach(card => {
        switch (valorOption) {
            case card.dataset.clube:
                card.hidden = false;
                break;
            case "":
                card.hidden = false;
                break;
            default:
                card.hidden = true;
                break;
            
        }
    })

}


// Função para ordenar por nome ou posição
function ordernar() {
    const btnNome = document.getElementById("ordenarNome");
    const btnPosicao = document.getElementById("ordenarPosicao");

    btnNome.addEventListener("click", () => {
        atletas.sort((a, b) => a.nome.localeCompare(b.nome));
        console.log("Ordenar por nome funcionou");
        
        criarCards();
    });

    btnPosicao.addEventListener("click", () => {
        atletas.sort((a, b) => a.posicao.localeCompare(b.posicao));
        criarCards();
    });
}