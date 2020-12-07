import React, { useState } from 'react';
import { useAuth } from '../hooks/auth';

const INITIAL_STATE = {
  email: '',
  passwd: ''
}

const CreateUser = () => {
  const { user, createUser } = useAuth();
  const [form, setForm] = useState(INITIAL_STATE)

  if(user){
    return null;
  }

  const onChangeField = evt => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value
    })
  }

  const onSave = () => {
    createUser.createUser(form.email, form.passwd);
    setForm(INITIAL_STATE);
  }

  return (
    <div>
      {
        createUser.createUserState.error && <p>{createUser.createUserState.error}</p>
      }
      <h3>Criar novo usuário</h3>
      <input type='text' name='email' onChange={onChangeField} value={form.email} placeholder="E-mail"/>{' '}
      <input type='password' name='passwd' onChange={onChangeField} value={form.passwd} placeholder="Senha"/>{' '}
      <button onClick={onSave}>Criar novo</button>
    </div>
  )
}

export default CreateUser;