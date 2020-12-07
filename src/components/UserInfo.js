import React, { useState } from 'react';
import { useAuth } from '../hooks/auth';

const Info = ({ displayName, user }) => {
  const [newDisplayName, setNewDisplayName] = useState(displayName)

  const onUpdateUser = () => {
    if(newDisplayName.trim().length > 0){
      user.updateProfile({ displayName: newDisplayName})
    }
  }

  return (
    <>
      <input type='text' onChange={evt => setNewDisplayName(evt.target.value)} value={newDisplayName} />
      <button onClick={onUpdateUser}>Salvar novo nome</button>
    </>
  )
}

const UserInfo = () => {
  const { user, signOut } = useAuth();

  if(!user) return null;

  const { displayName } = user;
  const [alternativeDisplayName] = user.email.split('@');
  const dn = displayName || alternativeDisplayName;

  return (
    <>
      <p>Olá { dn }!</p>
      <Info displayName={dn} user={user}/>      
      <button onClick={signOut}>Sair</button>
    </>
  )
}

export default UserInfo;