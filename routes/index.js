var express = require('express');
var youtubedl = require('youtube-dl');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Youtube downloader', copyright: '2016. Universitas Dian Nuswantoro. Develop by Firman Wahyudi' });
});


router.post('/getinfo', function(req, res, next) {
  var url = req.body.url;
  youtubedl.getInfo(url, function(err, info) {
    if (err) {
      return res.send({success:false, msg:'something wrong'});
    }
    res.send(info);
  });
});

router.get('/download/:id/:format', function(req, res, next) {
  var id = req.params.id;
  var format = req.params.format;
  var title = req.param('title');
  var ext = req.param('ext');
  console.log(title);
  var video = youtubedl('http://www.youtube.com/watch?v='+id,
      ['--format='+format],
      { cwd: __dirname });

  video.on('info', function(info) {
    console.log('Download started');
    console.log('filename: ' + info.filename);
    console.log('size: ' + info.size);
  });
  res.setHeader('Content-disposition', 'attachment; filename='+title+'-'+format+'.'+ext);
  //res.set('Content-Type', 'application/x-tar');
  video.pipe(res);
});

module.exports = router;
