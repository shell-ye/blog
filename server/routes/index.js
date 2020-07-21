var express = require('express');
var router = express.Router();
const pool = require('./../mysql/pool')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/article',(req, res) => {
  pool.query('select * from article where id = 1',(err, data) => {
    if ( err ) {
      console.log( err )
    } else {
      res.send({ code: 200, data: data[0]})
    }
  })
})

module.exports = router;
