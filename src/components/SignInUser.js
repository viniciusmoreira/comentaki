import React, { useState } from 'react';
import { useAuth } from '../hooks/auth';

const INITIAL_STATE = {
  email: '',
  passwd: ''
}

const SignInUser = () => {
  const { user, signInUser } = useAuth();
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

  const onLogar = () => {
    signInUser.signInUser(form.email, form.passwd);
    setForm(INITIAL_STATE);
  }

  return (
    <div>
      {
        signInUser.signInUserState.error && <p>{signInUser.signInUserState.error}</p>
      }
      <h3>Entrar na conta</h3>
      <input type='text' name='email' onChange={onChangeField} value={form.email} placeholder="E-mail"/>{' '}
      <input type='password' name='passwd' onChange={onChangeField} value={form.passwd} placeholder="Senha"/>{' '}
      <button onClick={onLogar}>Entrar</button>
    </div>
  )
}

export default SignInUser;