import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router';
import { environment } from '../../environment';


interface IState {

    user: {
        firstname: string,
        lastname: string,
        userid: number,
        email: string
    },
    errorMessage?: string
}

export class ChangeInfo extends React.Component<RouteComponentProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                userid: 0,
                email: ''
            }
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            user: {
                ...this.state.user,
                [name]: event.target.value
            }
        });
    }


    submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const tempUser = localStorage.getItem('user');
            const loggedUser = tempUser && JSON.parse(tempUser);
            console.log(loggedUser.userid)
            this.state.user.userid = loggedUser.userid
            const resp = await fetch(environment.context + '/users', {
                method: 'PATCH',
                //credentials: 'include',
                body: JSON.stringify(this.state.user),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const user = await resp.json();
            console.log(user);
            this.props.history.push('/profile');

        } catch (err) {
            console.error(err);
            console.log('invalid credentials');
            this.setState({
                errorMessage: 'Wrong Input Added'
            });
        }
    }

    render() {
        return (
            <form className="user-patch-form" onSubmit={this.submit}>
                <h1 className="updating title">Update Your Information</h1>
                <label htmlFor="inputFirstName" className="text-only">First Name</label>
                <input type="text" id="inputFirstName"
                    name="firstname"
                    className="form-control"

                    placeholder="First Name"

                    onChange={this.handleChange}

                    value={this.state.user.firstname} required />

                <label htmlFor="inputLastName" className="text-only">Last Name</label>

                <input type="text" id="inputLastName"

                    name="lastname"

                    className="form-control"

                    placeholder="Last Name"

                    onChange={this.handleChange}

                    value={this.state.user.lastname} required />

                <label htmlFor="inputEmail" className="text-only">Email</label>

                <input type="text" id="inputEmail"

                    name="email"

                    className="form-control"

                    placeholder="Email"

                    onChange={this.handleChange}

                    value={this.state.user.email} required />

                {this.state.errorMessage && <p id="error-message">{this.state.errorMessage}</p>}

                <button color="success" type="submit">Update Profile</button>

            </form>
        );
    }
}