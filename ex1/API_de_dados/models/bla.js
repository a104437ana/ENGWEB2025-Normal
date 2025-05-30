var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    _id : String,
    anoEdição: Number,
    organizacao: String,
    vencedor: String,
    musicas: [
        {
        id: String,
        link: String,
        título: String,
        país: String,
        compositor: String,
        intérprete: String,
        letra: String // opcional, só existe em algumas músicas
        }
    ]
    }, { versionKey: false })

module.exports = mongoose.model('edicao',bookSchema,'edicoes')