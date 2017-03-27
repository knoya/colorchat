'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  author: String,
  text: String,
  date: String,
  editDate: String,
  color: [],
  opacity: Number
});

module.exports = mongoose.model('Comment', CommentsSchema);
