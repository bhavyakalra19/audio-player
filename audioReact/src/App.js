import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const tokenValue = localStorage.getItem('token');

  useEffect(() => {
    if(!localStorage.getItem('token')){
      setIsLoggedIn(false);
    }else{
      setIsLoggedIn(true);
    }
  },[]);


  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false)
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!tokenValue && <Login onLogin={loginHandler} />}
        {tokenValue && <Home onLogout={logoutHandler} token={tokenValue}/>}
      </main>
    </React.Fragment>
  );
}

export default App;
