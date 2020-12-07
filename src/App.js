import React from 'react';
import Comments from './components/Comments'
import NewComment from './components/NewComment';
import CreateUser from './components/CreateUser';
import SignInUser from './components/SignInUser';
import UserInfo from './components/UserInfo';
import { AuthProvider } from './hooks/auth';

function App() {
  
  return (
    <AuthProvider>
      <NewComment />
      <Comments />
      <CreateUser />
      <SignInUser />
      <UserInfo />
    </AuthProvider>
  )
}

export default App;
