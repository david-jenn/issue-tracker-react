import { useState } from 'react';
import moment from 'moment';

function CommentSummary({ comment }) {
  return (
    <div className="card border-light mb-2">
      <div className="card-header d-flex justify-content-between">
        <div className="me-3">{comment.author?.fullName}</div>
        <div>{moment(comment.createdDate).fromNow()}</div>
      </div>
      <div className="card-body">
        <div>{comment.text}</div>
      </div>
    </div>
  );
}

export default CommentSummary;
