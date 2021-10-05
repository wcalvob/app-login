import React from 'react';
import Login from './components/Login';
import Home from './components/Home';

function App(){
   
   
    if (true) {
        return(
            <Login />
        );
    }else{
        return(
            <Home />
        );
    }

}

export default App;