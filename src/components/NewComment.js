import React, { useState } from 'react';
import firebase from '../firebase';
import { useDatabasePush } from '../utils/database';
import { useAuth } from '../hooks/auth';

const NewComment = () => {
  const [, save] = useDatabasePush('comments');
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  if(!user){
    return null;
  }

  const createComment = () => {
    if(comment.trim() !== ''){
      const displayName = user.displayName;
      const [alternativeDisplayName] = user.email.split('@');

      save({
        content: comment, 
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          id: user.uid,
          name: displayName || alternativeDisplayName
        }
      })
      setComment('');
    }
  }

  return (
    <div>
      <textarea value={comment} onChange={evt => setComment(evt.target.value)}/>
      <button onClick={createComment}>Salvar</button>
    </div>
  );
}

export default NewComment;