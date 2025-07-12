document.addEventListener("DOMContentLoaded", carregarTarefas);

function adicionarTarefa() {
    const tarefaInput = document.getElementById('tarefa');
    const tarefa = tarefaInput.value.trim();

    if(tarefa === "") {
        alert("Preencha sua tarefa!");
        return;
    }

    const tarefas = obterTarefas();
    tarefas.push({
        texto: tarefa,
        concluida: false
    });
    salvarTarefas(tarefas);

    tarefaInput.value = '';
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

            <div class="texto-tarefa ${tarefa.concluida ? 'concluida' : ''}">${tarefa.texto}</div>
            <button class="btn-remove" onclick="removerTarefa(${index})">
            <div class="circulo-remove"></div>
            <div class="circulo-remove"></div>
            <div class="circulo-remove"></div>
            <div class="circulo-remove"></div>
            Remover

            </button>

            <button onclick="marcarTarefa(${index})" class="btn-concluida">
                <h1>+</h1>
            </button>

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