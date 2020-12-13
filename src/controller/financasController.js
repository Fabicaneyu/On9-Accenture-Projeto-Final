const financasCollections = require("../models/financasSchema")

const getAll = (request, response) => {
    console.log(request.url)

    financasCollections.find((error, financas) => {
        if(error){
            return response.status(500).send(error)
        } else {
            return response.status(200).json({
                mensagem:"Get com sucesso",
                financas
            })
        }
    })
}

const addFinancas = (request, response) => {
    const financasDoBody = request.body
    const financas = new financasCollections(financasDoBody)

    financas.save((error) => {
        if(error){
            return response.status(400).send(error)
        } else {
            return response.status(200).send({
                mensagem:"POST com sucesso",
                financas
            })  
        }
    })
}

const getbyID = (request, response) => {
    const id = request.params.id;

    financasCollections.findById(id, (error, financas) => {
        if(error){
            return response.status(500).send(error);
        } else if(financas == "") {
            return response.status(404).send({
                mensagem:"ID não encontrado",
            })
        } else {
            //GET por id feito com sucesso"
            return response.status(200).send(financas);
        }
    })
}

const getbyNome = (request, response) => {
    const nome = request.params.nome;

    financasCollections.find({nome:nome}, (error, financas) => {
        if(error){
            return response.status(500).send(error);
        } else if(financas == "") {
            return response.status(404).send({
                mensagem:"Nome não encontrado"
            })
        } else {
            //"GET por nome feito com sucesso"
            return response.status(200).send(financas); 
        }
    })
}

module.exports = {
    getAll,
    addFinancas,
    getbyID,
    getbyNome
}