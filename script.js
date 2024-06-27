const nomes = ["Elton", "David", "Rubens", "Felipe", "Alexandre", "Geovanne", "Vinicius", "Danilo"];
const diasSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
const resultado = {};

function sortear(lista, excluido) {
    let sorteado;
    do {
        const indice = Math.floor(Math.random() * lista.length);
        sorteado = lista[indice];
    } while (sorteado === excluido);
    return sorteado;
}

function sortearNomes() {
    const nomesRestantes = [...nomes];

    for (const dia of diasSemana) {
        if (dia === "Segunda-feira" || dia === "Sexta-feira") {
            const nomeSorteado = sortear(nomesRestantes);
            resultado[dia] = [nomeSorteado];
            nomesRestantes.splice(nomesRestantes.indexOf(nomeSorteado), 1);
        } else if (dia === "Terça-feira") {
            let nome1 = sortear(nomesRestantes, "David");
            nomesRestantes.splice(nomesRestantes.indexOf(nome1), 1); 
            let nome2 = sortear(nomesRestantes, "David");
            resultado[dia] = [nome1, nome2];
            nomesRestantes.splice(nomesRestantes.indexOf(nome2), 1); 
        } else {
            const nome1 = sortear(nomesRestantes);
            nomesRestantes.splice(nomesRestantes.indexOf(nome1), 1); 
            const nome2 = sortear(nomesRestantes);
            resultado[dia] = [nome1, nome2];
            nomesRestantes.splice(nomesRestantes.indexOf(nome2), 1);
        }
    }
}

sortearNomes();

function exibirResultado() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    for (const [dia, nomesSorteados] of Object.entries(resultado)) {
        const p = document.createElement('p');
        p.textContent = `${dia}: ${nomesSorteados.join(", ")}`;
        resultadoDiv.appendChild(p);
    }
}

document.getElementById('sortearButton').addEventListener('click', () => {
    sortearNomes();
    exibirResultado();
});
