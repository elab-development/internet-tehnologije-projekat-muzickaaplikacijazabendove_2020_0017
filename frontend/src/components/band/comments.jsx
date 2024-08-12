import React from 'react'
import OneComment from './oneComment'

const Comments = ({comments}) => {
  // console.log(comments)

  return (
    <div className='allComments'>
      {comments == null ? (
        <h2>No comments jet</h2>
       ) : (
        comments.map((comment) => (
          <OneComment comment = {comment} key={comment.id}/>
        ))
      )}
        
    </div>
  )
}

export default Comments