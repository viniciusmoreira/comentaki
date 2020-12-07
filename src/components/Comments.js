import React from 'react';
import Comment from './Comment';
import { useDatabase } from '../utils/database';

const Comments = ({visible}) => {
  const data = useDatabase('comments');

  if(!data){
    return <p>Nenhum comentário enviado até o momento.</p>
  }

  const ids = Object.keys(data);

  if(ids.length === 0){
    return <p>Carregando...</p>
  }

  return ids.map(id => <Comment key={id} comment={data[id]} />)
}

export default Comments;