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

module.exports = {
    getAll,
    addFinancas
}