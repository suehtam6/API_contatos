'use strict'

const URL = 'https://bakcend-fecaf-render.onrender.com/contatos'

////Criando e exportando a função de getContato para mostrar todos os contatos
export async function getContatos() {

    const response = await fetch(URL)

    if (response.ok) {
        return response.json()
    } else {
        //throw -> Pode ser utilizado para enviar uma mensagem para o Desenvolvedor que for consumir a minha API.
        throw new Error('Erro ao listar os contatos!!')
    }

}

//Criando e exportando a função de getContato para mostrar somente um único contato
export async function getContato(id) {

    const response = await fetch(`${URL}/${id}`)

    //A API do professor retorna um ok se estiver tudo certo
    if (response.ok) {
        return response.json()
    } else {
        //throw -> Pode ser utilizado para enviar uma mensagem para o Desenvolvedor que for consumir a minha API.
        throw new Error(`Erro ao listar o contato ${id}`)
    }


}

//Criando e exportando a função para criar novos contatos
export async function postContatos(contato) {

    //Configurações para utilizar no fetch junto com a URL
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(URL, options)

    if (response.ok) {
        return response.json()
    } else {
        throw new Error('Erro ao criar um novo contato!!')
    }


}

//Criando e exportando a função para atualizar um contato ja existente
export async function putContato(id, contato) {

    //Configurações para utilizar o PUT
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)

    }

    const response = await fetch(`${URL}/${id}`, options)

    if (response.ok) {
        return response.json()
    } else {
        throw new Error('Erro ao atualizar contato!!')
    }

}

//Criando e exportando a função para deletar um contato ja existente
export async function deleteContato(id) {

    const options = {
        method: "DELETE"
    }

    const response = await fetch(`${URL}/${id}`, options)

    if (response.ok) {
        return true
    } else {
        throw new Error('Erro ao deletar um contato!!')
    }

}


const criarCardContato = async function(contato) {
        let result = document.getElementById('result')

        let caixaBTN = document.createElement('div')
        caixaBTN.className = 'caixaBTN'
    
        let card = document.createElement('div')
        card.className = 'card'
    
        let nome = document.createElement('h3')
       
        nome.textContent = contato.nome 
        
        let id = document.createElement('span')
        id.textContent = `ID: ${contato.id}`
    
        let foto = document.createElement('img')
        foto.src = contato.foto
    
        let botaoPUT = document.createElement('button')
        botaoPUT.textContent = 'UPD'
        botaoPUT.id = 'botaoPUT'
    
        let botaoDELETE = document.createElement('button')
        botaoDELETE.textContent = 'DLT'
        botaoDELETE.id = 'botaoDELETE'

        caixaBTN.append(botaoPUT, botaoDELETE)
    
        card.append(nome, foto, id, caixaBTN)
    
        result.replaceChildren(card)
}


const salvarNovoContato = async function () {

    let nomeContato     = document.getElementById('nome').value
    let numeroContato   = document.getElementById('numero').value
    let fotoContato     = document.getElementById('foto').value
    let emailContato    = document.getElementById('email').value
    let enderecoContato = document.getElementById('endereco').value
    let cidadeContato   = document.getElementById('cidade').value

    let novoContato = {
        nome: nomeContato,
        numero: numeroContato,
        foto: fotoContato,
        email: emailContato,
        endereco: enderecoContato,
        cidade: cidadeContato
    }

    try {
       
        const contatoCriado = await postContatos(novoContato)
        
        criarCardContato(contatoCriado)

        alert('Contato salvo com sucesso!')

    } catch (erro) {
        console.error(erro)
        alert('Não foi possível salvar o contato.')
    }
}

criarCardContato()


document.getElementById('salvar').addEventListener('click', salvarNovoContato)
