import React from 'react';
import { Link } from 'react-router-dom';
import RevLogo from '../../assets/rev-logo.png';


interface IState{
  role: number
}

export class NavComponent extends React.Component <{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = ({
      role: 0
    });
  }
 getUser = () => {
  const userString= localStorage.getItem('user');
  const user = userString && JSON.parse(userString);
  this.setState({
    ...this.state,
    role: user.role.roleid
  })
 }
 componentDidMount(){
  this.getUser();
 }


  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/sign-in" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
            </li>
            <li className="nav-item active">
              <Link to="/home" className="unset-anchor nav-link">Home</Link>
            </li>
            <li className="nav-item active">
            {this.state.role && (this.state.role === 1 || this.state.role === 3)
              ?<Link to="/reimbursements" className="unset-anchor nav-link">Reimbursements</Link>
              : null
              }
            </li>
            <li className="nav-item active">
              
              <Link to={`/submit`} className="unset-anchor nav-link">Create Reimbursement</Link>
              
            </li>
            <li className="nav-item active">
              <Link to="/change" className="unset-anchor nav-link">Change Information</Link>
            </li>
            <li className="nav-item active">
            {this.state.role && (this.state.role === 1 || this.state.role === 3)
              ?<Link to="/approve" className="unset-anchor nav-link">Approve/Deny</Link>
              : null
              }
            </li>
            <li className="nav-item active">
              <Link to="/profile" className="unset-anchor nav-link">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}