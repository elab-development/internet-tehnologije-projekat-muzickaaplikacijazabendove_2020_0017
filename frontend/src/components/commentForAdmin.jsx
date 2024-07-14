import React from 'react'

const CommentForAdmin = ({comment, deleteComment}) => {
  return (
    <div className='comment'>{comment.content}</div>
  )
}

export default CommentForAdmin