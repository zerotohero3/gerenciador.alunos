const estoqueAlunos = [];

function cadastrar () {
    const inputCodigo = document.getElementById("codigo");
    const codigo = inputCodigo.value.trim();

    const inputNome = document.getElementById("nome");
    const nome = inputNome.value.trim();

    const inputSobrenome = document.getElementById("sobrenome");
    const sobrenome = inputSobrenome.value;

    const inputEmail = document.getElementById("e-mail");
    const email = inputEmail.value.trim();

    const inputNota1 = document.getElementById("nota1");
    const nota1 = Number(inputNota1.value);

    const inputNota2 = document.getElementById("nota2");
    const nota2 = Number(inputNota2.value);

    const inputNota3 = document.getElementById("nota3");
    const nota3 = Number(inputNota3.value);

    const alunoComMesmoCodigo = estoqueAlunos.find(aluno => aluno.codigo === codigo);
    const alunoComMesmoEmail = estoqueAlunos.find(aluno => aluno.email === email);

    if (alunoComMesmoCodigo) {
        alert("Esse código já existe! Use outro código para cadastrar o aluno.");
        return;
    }

    if (alunoComMesmoEmail) {
        alert("Não é possível cadastrar um aluno com esse e-mail, pois ele já está sendo usado!");
        return;
    }

    const alunosDaLista = {
        codigo: codigo,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        notas: [nota1, nota2, nota3],
        ativo: true,
        media: (nota1 + nota2 + nota3) /3
    };

    try {
        validarNotas(nota1);
        validarNotas(nota2);
        validarNotas(nota3);
    } catch (error) {
        alert(error.message);
        return; 
    }

    if (!codigo || !nome || !sobrenome || !email || !nota1 || !nota2 || !nota3) {
        alert("Não é possível cadastrar um aluno sem preencher todos os campos!");
        return;
    }

    function validarNotas(nota) {
        if (nota < 0 || nota > 10) {
            throw new Error ("Insira apenas notas válidas, por favor.")
        }
    }

    const cadastroSucess = document.getElementById("alunoBusca");
    cadastroSucess.innerText = "Cadastro realizado com sucesso!"
    
    estoqueAlunos.push(alunosDaLista);


    inputCodigo.value = "";
    inputNome.value = "";
    inputSobrenome.value = "";
    inputEmail.value = "";
    inputNota1.value = "";
    inputNota2.value = "";
    inputNota3.value = "";
    inputCodigo.focus();

    console.table(estoqueAlunos);
}

const buscar = () => {
    const buscarCodigo = document.getElementById("codigo");

    const codigoBuscado = estoqueAlunos.find(aluno => aluno.codigo.toLowerCase().startsWith(buscarCodigo.value.trim().toLowerCase()));

    const alunoEncontrado = document.getElementById("alunoBusca");

    if (codigoBuscado) {
        const ativo = codigoBuscado.ativo ? "Sim" : "Não";
        const mensagem = "ALUNO ENCONTRADO: " + "Código: " + codigoBuscado.codigo + " | Nome: " + codigoBuscado.nome + " | Sobrenome: " + codigoBuscado.sobrenome + " | E-mail: " + codigoBuscado.email + " | Notas: " + codigoBuscado.notas + " | Ativo: " + ativo;
        alunoEncontrado.innerText = mensagem;
    } else {
        alunoEncontrado.innerText = "Aluno buscado não encontrado!";
    }

    // const alunoEncontrado = document.getElementById("alunoBusca");
    // alunoEncontrado.innerText = mensagem;
}

const remover = () => {
    const encontrarCodigo = document.getElementById("codigo");
    const codigoEncontrado = encontrarCodigo.value.trim().toLowerCase();

    const indiceAluno = estoqueAlunos.findIndex(aluno => aluno.codigo.toLowerCase() === codigoEncontrado);
    const alunoRemovido = document.getElementById("alunoBusca");

    if (indiceAluno === -1) {
        alunoRemovido.innerText = "Aluno não encontrado para ser removido!";
    } else {
        estoqueAlunos.splice(indiceAluno, 1);
        console.table(estoqueAlunos);
        alunoRemovido.innerText = "Aluno removido com sucesso!";
    }
}

function listaCompleta() {
    const listaCompletaAlunos = document.getElementById("alunoBusca");

    if (estoqueAlunos.length === 0) {
        listaCompletaAlunos.innerText = "Nenhum aluno cadastrado.";
    } else {
        let mensagem = "Lista de Alunos:\n" + "\n";

        estoqueAlunos.forEach(aluno => {
            const ativo = aluno.ativo ? "Sim" : "Não";
            mensagem += "Código: " + aluno.codigo + " | Nome: " + aluno.nome + " | Sobrenome: " + aluno.sobrenome + " | E-mail: " + aluno.email + " | Notas: " + aluno.notas.join(", ") + " | Ativo: " + ativo + "\n" + "\n";
        });

        listaCompletaAlunos.innerText = mensagem;
    }
}

function calcularMedia() {
    const inputCodigoCalcularMedia = document.getElementById("codigo");
    const mediaPorCodigo = document.getElementById("alunoBusca");

    const codigoCalcularMedia = inputCodigoCalcularMedia.value.trim().toLowerCase();
    const alunoEncontrado = estoqueAlunos.find(aluno => aluno.codigo.toLowerCase() === codigoCalcularMedia);

    if (!alunoEncontrado) {
        mediaPorCodigo.innerText = "Aluno não encontrado.";
    } else {
        const notasAluno = alunoEncontrado.notas;
        const mediaAluno = notasAluno.reduce((sum, nota) => sum + nota, 0) / notasAluno.length;

        mediaPorCodigo.innerText = "A média do(a) aluno(a) " + alunoEncontrado.nome + " é: " + mediaAluno.toFixed(2);
    }
}

function desativarAluno() {
    const inputCodigoDesativarAluno = document.getElementById("codigo");
    const desativarAlunoMessage = document.getElementById("alunoBusca");
    const codigoDesativarAluno = inputCodigoDesativarAluno.value.trim().toLowerCase();
    const alunoEncontrado = estoqueAlunos.find(aluno => aluno.codigo.toLowerCase() === codigoDesativarAluno);

    if (!alunoEncontrado) {
        desativarAlunoMessage.innerText = "Aluno não encontrado.";
        return;
    }

    if (alunoEncontrado.ativo === false) {
        desativarAlunoMessage.innerText = "Esse aluno já está inativo.";
        return;
    }

    alunoEncontrado.ativo = false;
    desativarAlunoMessage.innerText = "Aluno desativado com sucesso!";
}

function reativarAluno() {
    const inputCodigoReativar = document.getElementById("codigo");
    const reativarAlunoMessage = document.getElementById("alunoBusca");
    const reativarAlunoCodigo = inputCodigoReativar.value.trim().toLowerCase();
    const alunoEncontrado = estoqueAlunos.find(aluno => aluno.codigo.toLowerCase() === reativarAlunoCodigo);

    if (!alunoEncontrado) {
        reativarAlunoMessage.innerText = "Aluno não encontrado.";
        return;
    }

    if (alunoEncontrado.ativo === true) {
        reativarAlunoMessage.innerText = "Esse aluno já está ativo";
        return;
    }

    alunoEncontrado.ativo = true;
    reativarAlunoMessage.innerText = "Aluno reativado com sucesso!";
}

function listaDeAtivos() {
    const mostrarListaAtivos = document.getElementById("alunoBusca");
    const alunosAtivos = estoqueAlunos.filter(aluno => aluno.ativo);

    if (alunosAtivos.length === 0) {
        mostrarListaAtivos.innerText = "Não existem alunos ativos no momento.";
        return;
    } else {
        let mensagem = "Lista de alunos ativos:\n" + "\n";

        alunosAtivos.forEach(aluno => {
            const ativo = aluno.ativo ? "Sim" : "Não";
            mensagem += "Código: " + aluno.codigo + " | Nome: " + aluno.nome + " | Sobrenome: " + aluno.sobrenome + " | E-mail: " + aluno.email + " | Notas: " + aluno.notas.join(", ") + " | Ativo: " + ativo + "\n" + "\n";
        });

        mostrarListaAtivos.innerText = mensagem;
    }
}

function listaDeInativos() {
    const mostrarListaInativos = document.getElementById("alunoBusca");
    const alunosInativos = estoqueAlunos.filter(aluno => !aluno.ativo);

    if (alunosInativos.length === 0) {
        mostrarListaInativos.innerText = "Não existem alunos inativos no momento.";
        return;
    } else {
        let mensagem = "Lista de alunos inativos:\n" + "\n";

        alunosInativos.forEach(aluno => {
            const ativo = aluno.ativo ? "Sim" : "Não";
            mensagem += "Código: " + aluno.codigo + " | Nome: " + aluno.nome + " | Sobrenome: " + aluno.sobrenome + " | E-mail: " + aluno.email + " | Notas: " + aluno.notas.join(", ") + " | Ativo: " + ativo + "\n" + "\n";
        });

        mostrarListaInativos.innerText = mensagem;
    }
}

function alunosMediaGood() {
    const alunosNaMedia = document.getElementById("alunoBusca");
    const mediaEscola = 6;
    const alunosMediaBoa = estoqueAlunos.filter(aluno => {
        const mediaAluno = aluno.notas.reduce((sum, nota) => sum + nota, 0) / aluno.notas.length;
        return mediaAluno >= mediaEscola;
    });

    if (alunosMediaBoa.length === 0) {
        alunosNaMedia.innerText = "Nenhum aluno está dentro da média esperada.";
        return;
    }

    let mensagem = "Alunos dentro da média esperada:\n" + "\n";

    alunosMediaBoa.forEach(aluno => {
        mensagem += "Código: " + aluno.codigo + " | Nome: " + aluno.nome + " | Sobrenome: " + aluno.sobrenome + " | E-mail: " + aluno.email + " | Notas: " + aluno.notas.join(", ") + " | Média: " + aluno.media.toFixed(2) + "\n" + "\n";
    });

    alunosNaMedia.innerText = mensagem;
}

function alunosMediaBad() {
    const alunosForaDaMedia = document.getElementById("alunoBusca");
    const mediaEscola = 6;
    const alunosMediaRuim = estoqueAlunos.filter(aluno => {
        const mediaAluno = aluno.notas.reduce((sum, nota) => sum + nota, 0) / aluno.notas.length;
        return mediaAluno < mediaEscola;
    });

    if (alunosMediaRuim.length === 0) {
        alunosForaDaMedia.innerText = "Nenhum aluno está abaixo da média esperada.";
        return;
    }

    let mensagem = "Alunos abaixo da média esperada:\n" + "\n";

    alunosMediaRuim.forEach(aluno => {
        mensagem += "Código: " + aluno.codigo + " | Nome: " + aluno.nome + " | Sobrenome: " + aluno.sobrenome + " | E-mail: " + aluno.email + " | Notas: " + aluno.notas.join(", ") + " | Média: " + aluno.media.toFixed(2) + "\n" + "\n";
    });

    alunosForaDaMedia.innerText = mensagem;
}
