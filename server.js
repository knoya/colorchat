'use strict'

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let Comment = require('./model/commentSchema');

let app = express();
let apiRouter = express.Router();
let router = express.Router();

const port = 4000;

mongoose.connect('mongodb://localhost/mongo');

//parse json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setting headers
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(express.static('build'));

router.get('/', function(req, res) {
  res.send('index');
});

//initialize API
apiRouter.get('/', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      res.send(err);
    }
    res.json({"everything": "is working"})
  })
});

//adding /comments route
apiRouter.route('/comments')
  //client requesting all comments
  .get(function(req, res) {
    Comment.find(function(err, comments) {
      if (err)
        res.send(err);
      res.json(comments)
    });
  })
  //client posting new comment
  .post(function(req, res) {
    var comment = new Comment();
    (req.body.author) ? comment.author = req.body.author : null;
    (req.body.text) ? comment.text = req.body.text : null;
    (req.body.color) ? comment.color = req.body.color : null;
    (req.body.opacity) ? comment.opacity = req.body.opacity : null;
    (req.body.date) ? comment.date = req.body.date : null;

    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment submitted' });
      io.sockets.emit('newComment', comment);
    });
  });

//adding route for specific comments
apiRouter.route('/comments/:comment_id')
  //client updating a comment
  .put(function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
      if (err)
        res.send(err);
      (req.body.author) ? comment.author = req.body.author : null;
      (req.body.text) ? comment.text = req.body.text : null;
      (req.body.opacity) ? comment.opacity = req.body.opacity : null;
      (req.body.editDate) ? comment.editDate = req.body.editDate : null;
      comment.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Comment updated' });
        io.sockets.emit('editComment', comment);
      });
    });
  })
  //client deleting a comment
  .delete(function(req, res) {
    Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
      if (err)
        res.send(err);
      io.sockets.emit('removeComment', req.params.comment_id);
      res.json({ message: 'Comment has been deleted' })
    })
  });

app.use('/api', apiRouter);
app.use('/', router);

let server = app.listen(port, () => {
  console.log('Listening on 4000');
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
