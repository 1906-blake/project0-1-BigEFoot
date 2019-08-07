import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/not-found/not-found.component';
import { NavComponent } from './components/app-nav/app-nav.component';
import { Home } from './components/home/home.component';
import { SignIn } from './components/sign-in/sign-in.component';
import Reimbursements from './components/reimbursements/reimbursements.component';
import { CreateReimbursement } from './components/reimbursements/submit.reim.component';
import { ChangeInfo } from './components/profile/change.information.component';
import { Profile } from './components/profile/profile.component';
import ApproveDeny from './components/reimbursements/approve.reimbursement.component';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavComponent />
        {/* The switch will only render the first route to match */}
        <Switch>
          <Route path="/reimbursements" component={Reimbursements} />
          <Route path={`/submit`} component={CreateReimbursement} />
          <Route path="/change" component={ChangeInfo} />
          <Route path="/approve" component={ApproveDeny} />
          <Route path="/home" component={Home} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
//