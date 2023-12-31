var express = require('express');
var router = express.Router();

const upload = require('../utils/multer').single('avtar')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/uploadfile', (req, res) => {
  upload(req, res, (err) => {
      if (err) {
          res.json({ success: false, msg: err });
      }
      else {
          if (req.file == undefined) {
              res.json({ suceess: true, msg: 'No file selected' });
          } else {
              res.json({ success: true, msg: 'Image uploaded' });
          }
      }
  })
})
module.exports = router;



