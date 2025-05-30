var express = require('express');
var router = express.Router();
var axios = require('axios');

function now() {
  return new Date().toLocaleString('pt-PT', { hour12: false });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:25000/edicoes')
    .then(resp => {
        res.status(200).render("lista", {title: "Eurovisão - Todas as Edições", date: now(), livros: resp.data});
    })
    .catch(error => {
        console.log(error);
        res.status(500).render('error',{title: "Erro", date: now(), error: error});
    })
});

router.get('/:id', function(req, res, next) {
  axios.get('http://localhost:25000/edicoes/' + req.params.id)
  .then(resp => {
      res.status(200).render("ent", {title: "Eurovisão - Edição de Id " + req.params.id, date: now(), livro: resp.data});
  })
  .catch(error => {
      console.log(error);
      res.status(500).render('error',{title: "Erro", date: now(), error: error});
  })
});

router.get('/paises/:pais', function(req, res, next) {
  const pais = req.params.pais;

  axios.get('http://localhost:25000/edicoes/')
    .then(resp => {
      const edicoes = resp.data;

      // Filtrar edições que organizou
      const organizou = edicoes
        .filter(ed => ed.organizacao === pais)
        .map(ed => ({ id: ed._id, ano: ed.anoEdição }));

      // Filtrar edições em que participou (nas músicas)
      const participou = [];
      edicoes.forEach(ed => {
        const musicasPais = (ed.musicas || []).filter(m => m.pais === pais);

        musicasPais.forEach(musica => {
          participou.push({
            id: ed._id,
            ano: ed.anoEdição,
            titulo: musica.titulo,
            interprete: musica.interprete,
            venceu: ed.vencedor === pais
          });
        });
      });

      // Renderiza página com dados
      res.status(200).render('pais', {
        title: `País ${pais} na Eurovisão`,
        pais,
        organizou,
        participou,
        date: new Date()
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', {
        title: 'Erro',
        date: new Date(),
        error
      });
    });
});

module.exports = router;
