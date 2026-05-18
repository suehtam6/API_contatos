'use strict'

const URL = 'https://bakcend-fecaf-render.onrender.com/contatos'

////Criando e exportando a função de getContato para mostrar todos os contatos
export async function getContatos() {
    
    const response = await fetch(URL)

    if(response.ok){
        return response.json()
    }else{
        //throw -> Pode ser utilizado para enviar uma mensagem para o Desenvolvedor que for consumir a minha API.
        throw new Error('Erro ao listar os contatos!!')
    }

}

//Criando e exportando a função de getContato para mostrar somente um único contato
export async function getContato(id) {
    
    const response = await fetch(`${URL}/${id}`)

    //A API do professor retorna um ok se estiver tudo certo
    if(response.ok){
        return response.json()
    }else{
        //throw -> Pode ser utilizado para enviar uma mensagem para o Desenvolvedor que for consumir a minha API.
        throw new Error(`Erro ao listar o contato ${id}`)
    }


}

//Criando e exportando a função para criar novos contatos
export async function postContatos(contato) {
    
    //Configurações para utilizar no fetch junto com a URL
    let options = {
        method:     'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(URL, options)

    if(response.ok){
        return response.json()
    }else{
        throw new Error('Erro ao criar um novo contato!!')
    }


}