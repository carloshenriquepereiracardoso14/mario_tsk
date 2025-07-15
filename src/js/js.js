document.addEventListener("DOMContentLoaded", carregarTarefas);

function adicionarTarefa() {
    const tarefaInput = document.getElementById('tarefa');
    const tarefa = tarefaInput.value.trim();
    const nomeTarefaInput = document.getElementById("nome-tarefa");
    const nome = nomeTarefaInput.value.trim();

    if(tarefa === "" || nome === "") {
        alert("Preencha o nome da tarefa e sua tarefa!");
        return;
    }

    const tarefas = obterTarefas();
    tarefas.push({
        texto: tarefa,
        nome: nome,
        concluida: false
    });
    salvarTarefas(tarefas);

    tarefaInput.value = '';
    nomeTarefaInput.value = '';
    carregarTarefas();
}

function carregarTarefas() {
    const lista = document.querySelector('.lista-tarefa');
    lista.innerHTML = '';

    const tarefas = obterTarefas();
    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        
        li.innerHTML = `

            <div class="cont-status">
                <img src="src/img/MarioHub_Characters_CharBtn_Yoshi_off.png" class="yoshi">
                <span class="texto-status">${tarefa.concluida ? 'Tarefa Concluída' : 'Falta Concluir!'}</span>
            </div>

            <div class="texto-tarefa ${tarefa.concluida ? 'concluida' : ''}">
                <p class="nome-tarefa">${tarefa.nome}</p>
                <p>${tarefa.texto}</p>
            </div>

            <div class="cont-actions">
                <button class="btn-remove" onclick="removerTarefa(${index})">
                    <div class="circulo-remove"></div>
                    <div class="circulo-remove"></div>
                    <div class="circulo-remove"></div>
                    <div class="circulo-remove"></div>
                    <span class="material-symbols-outlined">
                    delete
                    </span>

                </button>

                <button onclick="marcarTarefa(${index})" class="btn-concluida">
                    <h1>+</h1>
                </button>

                <button onclick="editarTarefa(${index}); contModal()" class="btn-abrir-modal">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
            </div>

        `;

        lista.appendChild(li);
    });
}

function removerTarefa(index) {
    const tarefas = obterTarefas();
    tarefas.splice(index, 1);
    salvarTarefas(tarefas);
    carregarTarefas();
}

function obterTarefas() {
    const tarefas = localStorage.getItem('tarefas');
    return tarefas ? JSON.parse(tarefas) : [];
}

function salvarTarefas(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function marcarTarefa(index) {
    const tarefas = obterTarefas();
    tarefas[index].concluida = ! tarefas[index].concluida;

    salvarTarefas(tarefas);
    carregarTarefas();

    const som = document.getElementById("audio-concluida")
    const li = document.querySelectorAll("li");

    if (tarefas[index].concluida) {
        som.currentTime = 0;
        som.play();
        li[index].classList.add("marcada");
    } else {
        li[index].classList.remove("marcada");
    }
    
}

let tarefaEditandoIndex = null;

function editarTarefa(index) {
    const tarefas = obterTarefas();
    const tarefaTexto = document.getElementById("texto-tarefa");
    const nomeTarefa = document.getElementById("nome-tarefa-edit");
    nomeTarefa.value = tarefas[index].nome;
    tarefaTexto.value = tarefas[index].texto;

    tarefaEditandoIndex = index;
}

function salvarEdicao() {
    if (tarefaEditandoIndex === null) return;

    const tarefaTexto = document.getElementById("texto-tarefa").value.trim();
    const nomeTarefa = document.getElementById("nome-tarefa-edit").value.trim();

    if (tarefaTexto === "" || nomeTarefa === "") {
        alert("Preencha o nome e a tarefa!");
        return;
    }

    const tarefas = obterTarefas();
    tarefas[tarefaEditandoIndex].texto = tarefaTexto;
    tarefas[tarefaEditandoIndex].nome = nomeTarefa;

    salvarTarefas(tarefas);
    carregarTarefas();
    contModal();
    tarefaEditandoIndex = null;
}

const modal = document.querySelector(".modal-editar");

function contModal() {
    modal.classList.toggle("ativo");
}

document.addEventListener("click", function(event) {
    if (modal.classList.contains("ativo")) {
        if (!modal.contains(event.target) && !event.target.closest(".btn-abrir-modal")) {
            modal.classList.remove("ativo");
        }
    }
});