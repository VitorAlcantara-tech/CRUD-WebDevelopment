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

    document.getElementById("cardForm").addEventListener("submit", addCards);
    document.getElementById("cardsList").addEventListener("click", handleClick);
}

// Evento de clique para editar e apagar cards
const handleClick = (infosDoEvento) => {
    const acaoBtn = infosDoEvento.target.dataset.action;
    const indexCard = infosDoEvento.target.dataset.index;
    
    if(!acaoBtn) return;

    if(acaoBtn === "Editar"){
        editarCards(indexCard) 
    }
    else if(acaoBtn === "Apagar"){
        apagarCards(indexCard)
    }
}



//Função cria os cards dos atletas
function criarCards() {
    const cardsList = document.getElementById("cardsList");
    cardsList.innerHTML = ""; // Limpa o container antes de adicionar novos cards

    atletas.forEach((pegaCard, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card__atleta');

        cardElement.innerHTML = `
            ${pegaCard.foto ? `<img src="${pegaCard.foto}" alt="Imagem da ${pegaCard.nome}" style="max-width:150px;">` : ""}
            <p>${pegaCard.nome}</p>
                <p>Posição: ${pegaCard.posicao}</p>
                <p>Clube: ${pegaCard.clube}</p>
                <p>Gols: ${pegaCard.gols}</p>
                <p>Assistências: ${pegaCard.assistencias}</p>
                <p>Partidas: ${pegaCard.jogos}</p>
                <button data-action="Editar" data-index=${index}><i class="fa-solid fa-pen-to-square"></i> Editar</button>
                <button data-action="Apagar" data-index=${index}><i class="fa-solid fa-eraser"></i> Apagar</button>
                <hr style="margin:50px;">`;

        cardsList.append(cardElement);
    })
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

    console.log("Funcionou");
    
    atletas.unshift(cardNovo);
    salvarLocalStorage();

    document.querySelector('#cardForm').reset();
    criarCards();
}

// Função para editar e apagar cards

function apagarCards(indexCard) {
    const confirmar = confirm("Tem certeza que deseja apagar este atleta?");

    if(confirmar){
        atletas.splice(indexCard, 1)
        salvarLocalStorage();
        criarCards()
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
}