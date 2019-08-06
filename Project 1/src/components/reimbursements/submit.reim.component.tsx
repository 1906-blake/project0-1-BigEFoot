import { environment } from "../../environment";
import React from "react";

import { Input, Button } from "reactstrap";

interface IState {
    users: any,
    reim: {
        author: number,
        amount: number,
        description: '',
        type: number
    },
    reimType: any,
    typeDropdown: {
        isOpen: boolean,
        selection: string
    },
    errorMessage?: string,
    successMessage?: string
}
export class CreateReimbursement extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            reim: {
                author: 0,
                amount: 0,
                description: '',
                type: 1
            },
            reimType: [],
            typeDropdown: {
                isOpen: false,
                selection: ''
            }
        }

        this.setType = this.setType.bind(this);
    }

    async componentDidMount() {
        this.getAuthor();
        this.getType();
    }
    getType = async () => {
        const resp = await fetch(environment.context + '/reimbursements/type', {
            //credentials: 'include'
        });
        const reimTypeFromServer = await resp.json();
        this.setState({
            ...this.state,
            reimType: reimTypeFromServer
        });
    }

    getAuthor = async () => {
        const resp = await fetch(environment.context + '/users', {
            //credentials: 'include'
        });
        const usersFromServer = await resp.json();
        this.setState({
            ...this.state,
            users: usersFromServer
        });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            ...this.state,
            reim: {
                ...this.state.reim,
                [name]: event.target.value
            }
        });
    }

    toggleTypeDropdown = () => {
        this.setState({
            ...this.state,
            typeDropdown: {
                ...this.state.typeDropdown,
                isOpen: !this.state.typeDropdown.isOpen
            }
        });
    }

    selectAuthor = (event: any) => {
        this.setState({
            ...this.state,
            reim: {
                ...this.state.reim,
                author: event.target.value
            }
        })
    }

    setType = (event: any) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            reim: {
                ...this.state.reim,
                type: +value
            }
        });

    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {
        const body = {
            author: {
                userid: this.state.reim.author
            },
            amount: this.state.reim.amount,
            description: this.state.reim.description,
            type: {
                typeId: this.state.reim.type
            }

        }
        event.preventDefault();
        try {
            console.log('reim being submitted ' + this.state.reim.author)
            const resp = await fetch('http://localhost:8012/reimbursements', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const reimbursement = await resp.json();
            this.setState({
                ...this.state,
                successMessage: `Reimbursement ID ${ reimbursement.reimbursementid } created!`
            })

    } catch(err) {
        console.log(err);
        console.log('Reimbursement submition error');
        this.setState({
            errorMessage: 'Reimbursement submission error'

        });
    }
}

render() {
    const users = this.state.users;
    const types = this.state.reimType;
    return (
        <div>
            <form className="form-reimbursements table-hover" onSubmit={this.submit}>
                <p className="success-message">{this.state.successMessage}</p>
                <h1 className="h2 mb-4 font-weight-normal">Enter a new reimbursement request</h1>
                <p>Author
                           <label htmlFor="inputAuthor" className="sr-only">Author</label>

                    <Input type="select" onChange={this.selectAuthor}>
                        {
                            users.map((user: any) =>
                                <option value={user.userid} key={'userId -' + user.username}>
                                    {user.firstname} {user.lastname}
                                </option>
                            )
                        }
                    </Input>
                </p>
                <p>Amount
                           <label htmlFor="inputAmount" className="sr-only">Amount</label>

                    <input type="text" id="inputAmount"
                        name="amount"
                        className="form-control"
                        placeholder="Amount"
                        onChange={this.handleChange}
                        value={this.state.reim.amount} required />
                </p>
                <p>Description
                           <label htmlFor="inputDescription" className="sr-only">Description</label>

                    <input type="text" id="inputDescription"
                        name="description"
                        className="form-control"
                        placeholder="Description"
                        onChange={this.handleChange}
                        value={this.state.reim.description} required />
                </p>
                <div>
                    <p>Reimbursement Type
                               <Input type="select" onChange={this.setType}>
                            {
                                types.map((type: any) =>
                                    <option value={type.typeid} key={'typeId -' + type.typeid}>
                                        {type.type}
                                    </option>
                                )
                            }
                        </Input>
                    </p>
                </div>

                {this.state.errorMessage && <p id="error-message">{this.state.errorMessage}</p>}

                <Button color="success" type="submit">Submit Request</Button>
            </form>
        </div>
    );
}









}