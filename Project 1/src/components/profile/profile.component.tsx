import React from "react";
import { RouteComponentProps } from "react-router";
import { environment } from "../../environment";

interface IState {

    user: {
        username: string,
        firstname: string,
        lastname: string,
        userid: number,
        email: string,
        role: string
    },
    errorMessage?: string
}

export class Profile extends React.Component<RouteComponentProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: {
                username: '',
                firstname: '',
                lastname: '',
                userid: 0,
                email: '',
                role: ''
            }
        }
    }
    async componentDidMount() {
        this.getUserId()
    }
    getUserId = async () => {
        const tempUser = localStorage.getItem('user');
        const loggedUser = tempUser && JSON.parse(tempUser);
        console.log(loggedUser)
        if (loggedUser !== 'invalid credentials') {
            const resp = await fetch(environment.context + `/users/` + loggedUser.userid, {
                credentials: 'include'
            });
            const userFromServer = await resp.json();
            this.setState({
                user: {
                    username: userFromServer.username,
                    firstname: userFromServer.firstname,
                    lastname: userFromServer.lastname,
                    userid: userFromServer.userid,
                    email: userFromServer.email,
                    role: userFromServer.role.role
                }
            });
            console.log(userFromServer);
        }
    }
    render() {
        const user = this.state.user;
        return (
            <div id="user-info-container">

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.username}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}