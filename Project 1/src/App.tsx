import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/not-found/not-found.component';
import { NavComponent } from './components/app-nav/app-nav.component';
import { Home } from './components/home/home.component';
import { Clicker } from './components/clicker/clicker.component';
import { TicTacToe } from './components/tic-tac/tic-tac.component';
import { Norris } from './components/norris/norris.component';
import { Pokemon } from './components/pokemon/pokemon.component';
import { Nested } from './components/nested/nested.component';
import { SignIn } from './components/sign-in/sign-in.component';
import Cards from './components/cards/cards.component';
import Reimbursements from './components/reimbursements/reimbursements.component';
import {CreateReimbursement} from './components/reimbursements/submit.reim.component';
import Profile from './components/profile/profile.component';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavComponent />
        {/* The switch will only render the first route to match */}
        <Switch>
          <Route path="/reimbursements" component={Reimbursements} />
          <Route path={`/submit`} component={CreateReimbursement} />
          <Route path="/profile" component={Profile} />
          <Route path="/cards" component={Cards} />
          <Route path="/chuck-norris" component={Norris} />
          <Route path="/clicker" component={Clicker} />
          <Route path="/home" component={Home} />
          <Route path="/nested" component={Nested} />
          <Route path="/pokemon" component={Pokemon} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/tic-tac-toe" component={TicTacToe} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
//