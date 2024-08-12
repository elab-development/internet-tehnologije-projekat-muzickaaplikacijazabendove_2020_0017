import React from 'react'
import CommentForAdmin from './commentForAdmin'

const CommentsForAdmin = ({comments, deleteComment}) => {
  return (
    <div className='comments'>
        <h3>COMMENTS</h3>
        {comments.map((comment) => (
          <CommentForAdmin comment = {comment} key={comment.id} deleteComment={deleteComment}/>
      ))}
    </div>
  )
}

export default CommentsForAdmin