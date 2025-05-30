var Book = require('../models/bla')

module.exports.list = () => {
    return Book.find({}, { anoEdição: 1, organizacao: 1, vencedor: 1}).exec();
}

module.exports.listGenre = (e) => {
    return Book.find({ genres: { $in: [e] } }).exec()
}

module.exports.listOrg = (c) => {
    return Book.find({ organizacao: c },{ anoEdição: 1, organizacao: 1, vencedor: 1}).exec()
}

module.exports.findById = (id) => {
    return Book.findById(id).exec()
}

module.exports.listPaisesOrganizadores = () => {
    return Book.aggregate([
    {
    $group: {
        _id: "$organizacao", // agrupa pelo país organizador
        anos: { $addToSet: "$anoEdição" } // adiciona os anos sem repetir
    }
    },
    {
    $project: {
        _id: 0,
        país: "$_id",
        anos: 1
    }
    },
    {
    $sort: { país: 1 } // ordena alfabeticamente pelo país
    }
]).exec();
}

module.exports.listPaisesVencedores = () => {
    return Book.aggregate([
    {
    $group: {
        _id: "$vencedor",      // agrupa pelo país vencedor
        anos: { $addToSet: "$anoEdição" }  // lista única dos anos que venceu
    }
    },
    {
    $project: {
        _id: 0,
        país: "$_id",
        anos: 1
    }
    },
    {
    $sort: { país: 1 }  // ordena alfabeticamente pelo país
    }
]).exec();
}

module.exports.listInterpretes = () => {
    return Book.aggregate([
    { $unwind: "$musicas" }, // desfaz o array, uma doc por música
    {
    $group: {
        _id: { intérprete: "$musicas.intérprete", país: "$musicas.país" }
    }
    },
    {
    $project: {
        _id: 0,
        intérprete: "$_id.intérprete",
        país: "$_id.país"
    }
    },
    { $sort: { intérprete: 1 } }
]).exec();
}

module.exports.inter = () => {
    return Book.distinct("genres").exec()
}

module.exports.characters = () => {
    return Book.distinct("characters").exec()
}

module.exports.insert = (contrato) => {
    return Book.findById(contrato._id).exec().then(c => {
        if (!c) {
            const newContrato = new Book(contrato);
            return newContrato.save();
        }
        return null;
    }).catch(err => {
        console.error("Erro ao inserir contrato:", err);
        throw err;
    });
}

module.exports.update = (id, contrato) => {
    return Book.findByIdAndUpdate(id, contrato).exec()
}

module.exports.delete = (id) => {
    return Book.findByIdAndDelete(id).exec()
}