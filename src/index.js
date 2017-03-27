import React from 'react';
import ReactDOM from 'react-dom';
import CommentWrap from './CommentWrap';

ReactDOM.render(
  <CommentWrap
    api='http://localhost:4000/api/comments' />,
  document.getElementById('root')
);
