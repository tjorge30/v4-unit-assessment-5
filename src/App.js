import React from 'react';
import './App.css';
import routes from './routes';
import Nav from './Components/Nav/Nav'

function App() {
  return (
    <div className='App'>
      <div>
        < Nav/>
        {routes}
      </div>
    </div>
  )
};

export default App;
