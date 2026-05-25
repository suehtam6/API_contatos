'use strict'

import { getContatos, getContato, postContatos, putContato, deleteContato } from "./contatos.js"


const atualizarDados = async function(contato) {
    
    let result = document.getElementById('result')
    

    result.replaceChildren()
    
    let padronizarContato = document.createElement('div')
    padronizarContato.className = 'padronizarContato'

    let conteinarInput = document.createElement('div')
    conteinarInput.className = 'conteinarInput'

    


    let tituloEdit = document.createElement('h2')
    tituloEdit.textContent = `Editar Contato: ${contato.nome}`


    let inputNome = document.createElement('input')
    inputNome.value = contato.nome
    inputNome.placeholder = "Nome"
    inputNome.className = 'caixaInput'

    let inputNumero = document.createElement('input')
    inputNumero.value = contato.numero
    inputNumero.placeholder = "Número"
    inputNumero.className = 'caixaInput'


    let inputFoto = document.createElement('input')
    inputFoto.value = contato.foto
    inputFoto.placeholder = "URL da Foto"
    inputFoto.className = 'caixaInput'

    let inputEmail = document.createElement('input')
    inputEmail.value = contato.email
    inputEmail.placeholder = "E-mail"
    inputEmail.className = 'caixaInput'

    let inputEndereco = document.createElement('input')
    inputEndereco.value = contato.endereco
    inputEndereco.placeholder = "Endereço"
    inputEndereco.className = 'caixaInput'

    let inputCidade = document.createElement('input')
    inputCidade.value = contato.cidade
    inputCidade.placeholder = "Cidade"
    inputCidade.className = 'caixaInput'


    let botaoConfirmar = document.createElement('button')
    botaoConfirmar.textContent = 'Confirmar'
    
    let botaoCancelar = document.createElement('button')
    botaoCancelar.textContent = 'Cancelar'

    botaoConfirmar.onclick = async () => {
        //Confirmando se o usuário realmente deseja atualizar o contato
        if(confirm("Tem certeza que deseja atualizar este contato?")) {

            let contatoAtualizado = {
                nome: inputNome.value,
                numero: inputNumero.value,
                foto: inputFoto.value,
                email: inputEmail.value,
                endereco: inputEndereco.value,
                cidade: inputCidade.value
            }
            let validar = await validarDados(contatoAtualizado)

            if(validar){
                await putContato(contato.id, contatoAtualizado)
                result.replaceChildren() 
                carregarContatos()
            }else{
                alert('ERRO: Erro ao validar os dados do contato')
            }
            

        }else{
            alert('Por favor, preencha todos os dados corretamente para atualizar.')
        }
    }

    botaoCancelar.addEventListener('click', () => {
        result.replaceChildren()
        carregarContatos()
    })
    
    let caixaBTN = document.createElement('div')
    caixaBTN.append(botaoConfirmar, botaoCancelar)
    caixaBTN.className = 'botoes-editar'

    conteinarInput.append(
        inputNome, 
        inputNumero, 
        inputFoto, 
        inputEmail, 
        inputEndereco, 
        inputCidade
    )

    padronizarContato.append(tituloEdit, conteinarInput, caixaBTN)
    
    result.append(padronizarContato)
}


const criarCardContato = function (contato) {

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
    botaoPUT.className = 'btn-editar' 
    botaoPUT.addEventListener('click', () => atualizarDados(contato))


    let btn_put = document.createElement('img')
    btn_put.src = '../img/lapis.png' 
    btn_put.alt = 'Editar contato'   


    botaoPUT.append(btn_put)

    botaoPUT.append(btn_put)

    let botaoDELETE = document.createElement('button')
    botaoDELETE.onclick = async () => {
        if(confirm("Tem certeza que deseja deletar este contato?")) {
            await deleteContato(contato.id)
            result.replaceChildren() 
            carregarContatos()
        }
    }
    let btn_delete = document.createElement('img')
    btn_delete.src = '../img/lixeira.png'
    btn_delete.alt = 'Deletar contato'
    botaoDELETE.append(btn_delete)

    
    caixaBTN.append(botaoPUT, botaoDELETE)
    card.append(nome, foto, id, caixaBTN)

    result.append(card) 
}


const carregarContatos = async function () {
    try {
        let result = document.getElementById('result')
       
        result.replaceChildren()
       
        let listaContatos = await getContatos()
        
        if (Array.isArray(listaContatos)) {
            listaContatos.map(criarCardContato)
        } else {
            alert("ERRO: Não foram encontrados dados para retornar!!")
        }
    } catch (erro) {
        alert("ERRO: AO CARREGAR DADOS!!")
    }
}


const salvarNovoContato = async function () {
    let nomeContato = document.getElementById('nome').value
    let numeroContato = document.getElementById('numero').value
    let fotoContato = document.getElementById('foto').value
    let emailContato = document.getElementById('email').value
    let enderecoContato = document.getElementById('endereco').value
    let cidadeContato = document.getElementById('cidade').value

    let novoContato = {
        nome: nomeContato,
        numero: numeroContato,
        foto: fotoContato,
        email: emailContato,
        endereco: enderecoContato,
        cidade: cidadeContato
    }

    let validar = await validarDados(novoContato)

    if(validar){
        await postContatos(novoContato)
        alert('Contato salvo com sucesso!')
        carregarContatos()
        limparDados()
    }else{
        alert('Não foi possível salvar o contato.')
    }
}

const limparDados = async function() {
    document.getElementById('nome').value = ''
    document.getElementById('numero').value = ''
    document.getElementById('foto').value = ''
    document.getElementById('email').value = ''
    document.getElementById('endereco').value = ''
    document.getElementById('cidade').value = ''
}

const validarDados = async function(contato){
    if(contato.nome == undefined || String(contato.nome) == '' || !isNaN(contato.nome) || contato.nome == null){
        return false
    }else if(contato.numero == undefined || String(contato.numero) == '' || isNaN(contato.numero) || contato.numero == null){
        return false
    }else if(contato.foto == undefined || String(contato.foto) == '' || contato.foto == null){
        return false
    }else if(contato.email == undefined || String(contato.email) == '' || contato.email == null){
        return false
    }else if(contato.endereco == undefined || String(contato.endereco) == '' || !isNaN(contato.endereco) || contato.endereco == null){
        return false
    }else if(contato.cidade == undefined || String(contato.cidade) == '' || !isNaN(contato.cidade) || contato.cidade == null){
        return false
    }else{
        return true
    }
}

carregarContatos()
document.getElementById('salvar').addEventListener('click', salvarNovoContato)