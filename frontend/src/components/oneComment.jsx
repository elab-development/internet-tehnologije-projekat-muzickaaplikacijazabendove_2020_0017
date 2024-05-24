import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OneComment = ({comment}) => {
  const [user, setUser] = useState('');

  useEffect(() => {
      axios.get(`api/users/${comment.user_id}`).then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
    }, [comment.user_id]);


  // console.log(user.name)
  return (
    <div className='comment'>
      <p>{user.name}</p>
      <p>{comment.content}</p>
      </div>
  )
}

export default OneComment