import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserContext from './context/UserContext'
import './App.css'
import Axios from 'axios';



function App() {

  const [userData, setUserData] = useState({
    id: undefined,
    user: undefined
  })

  

  useEffect(() => {
    const loginCheck = async () => {
      let token = localStorage.getItem("x-auth-token")
      if (token == null) {
        localStorage.setItem('x-auth-token', '');
        token = '';
      }
      const tokenRes = await Axios.post('http://localhost:8080/api/users/tokenIsValid', null, {
        headers: { 'x-auth-token': token }
      });
      if(tokenRes.data){
        const userRes = await Axios.get('http://localhost:8080/api/users/', {
          headers:{'x-auth-token':token}
        })
        setUserData({
          id:userRes.data.id,
          user:userRes.data.user,
        })
      }
    }

    loginCheck();

  }, [])

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
