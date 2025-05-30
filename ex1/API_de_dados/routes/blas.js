var express = require('express');
var router = express.Router();
var Book = require('../controllers/blas')

router.post('/edicoes', function(req, res, next) {
  Book.insert(req.body)
  .then(data => res.status(201).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

/* GET home page. */
router.get('/edicoes', function(req, res, next) {
  if (req.query.org) {
    Book.listOrg(req.query.org)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
  } else {
    Book.list()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
  }
});

router.get('/paises', function(req, res, next) {
  if (req.query.papel === 'org') {
    Book.listPaisesOrganizadores()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
  } else if (req.query.papel === 'venc') {
    Book.listPaisesVencedores()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
  }
});

router.get('/interpretes', function(req, res, next) {
  Book.listInterpretes()
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/edicoes/:id', function(req, res, next) {
  Book.findById(req.params.id)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.put('/edicoes/:id', function(req, res, next) {
  Book.update(req.params.id, req.body)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

router.delete('/edicoes/:id', function(req, res, next) {
  Book.delete(req.params.id)
  .then(data => res.status(200).jsonp(data))
  .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
