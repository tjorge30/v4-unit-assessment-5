import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Dash from './Components/Dash/Dash';
import Form from './Components/Form/Form';
import Post from './Components/Post/Post';

export default( 
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route exact path='/dash' component={Dash} />
        <Route exact path='/post/:id' component={Post} />
        <Route exact path='form' component={Form} />
    </Switch>
);