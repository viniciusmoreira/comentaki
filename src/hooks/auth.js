import React, { useState, useContext, useEffect } from 'react';
import firebase from '../firebase';

export const AuthContext = React.createContext();

const useGetUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser, err) => {
      if(currentUser){
        setUser(currentUser);
      } else {
        setUser(null);
      }
    })
  }, []);

  return user;
}

const useCreateUser = (email, password) => {
  const [state, setState] = useState({ error:'', success:''});
  const createUser = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      setState({
        ...state,
        success: 'OK'
      })
    })
    .catch(err => {
      setState({
        ...state,
        error: err.message
      })
    })
  }

  return [state, createUser]
}

const useSignInUser = (email, password) => {
  const [state, setState] = useState({ error:'', success:''});
  const signInUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(err => {
      setState({
        ...state,
        error: err.message
      })
    })
  }

  return [state, signInUser]
}

// Ao desconectar, o Google acionará o metodo onAuthStateChanged, que 
//atualizara, o estado do hook.
const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log('Usuário desconectou.'))
    .catch(() => console.log('Problemas ao desconectar usuário.'))
}

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const user = useGetUser();
  const [ createUserState, createUser ] = useCreateUser();
  const [ signInUserState, signInUser ] = useSignInUser();

  return (
    <AuthContext.Provider value={{ 
      user, 
      createUser: {
        createUserState, 
        createUser
      },
      signInUser: {
        signInUserState,
        signInUser
      },
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}