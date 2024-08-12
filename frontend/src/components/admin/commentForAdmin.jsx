import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CommentForAdmin = ({comment, deleteComment}) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get(`api/users/${comment.user_id}`).then((res) => {
      // console.log(res.data);
      setUser(res.data);
    })
  }, [comment.user_id]);

  const handleClick = () => {
    deleteComment(comment);
  }

  return (
    <div className='comment'>
        <p>{user.name}</p>
        <p>{comment.content}</p>

        <button className='addToFavoritesButton' onClick={handleClick}>Delete comment</button>
      
      </div>
  )
}

export default CommentForAdmin