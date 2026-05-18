'use strict'

import { getContatos, getContato, postContatos, putContato, deleteContato} from "./contatos.js"


//Criando um novo contato
const novoContato = {
    
    "nome": "Matheus Lucas",
    "celular": "11 9 1112-3333",
    "foto": "https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671122.jpg",
    "email": "MatheusLucas@gmail.com",
    "endereco": "Av. Brigadeiro Manoel Rodrigues Jordão, 102",
    "cidade": "Barueri"
    
}


console.table(await deleteContato(102))

