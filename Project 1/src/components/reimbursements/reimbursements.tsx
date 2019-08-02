import React, { Component } from 'react';
import Reimbursement from '../../models/reimbursements';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { environment } from '../../environment';

interface IState {
    reim: Reimbursement[],
    //byId: Reimbursement[],
    reimDropdown: {
        isOpen: boolean,
        selection: string
    }
}

export default class Reimbursements extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reim: [],
            //byId: [],
            reimDropdown: {
                isOpen: false,
                selection: 'All'
            }
        };
    }

    async componentDidMount() {
        this.getReimbersments()
    }

    getReimbersments = async () => {
        const resp = await fetch(environment.context + '/reimbursements', {
            //credentials: 'include'
        });
        const reimFromServer = await resp.json();
        this.setState({
            reim: reimFromServer,
            reimDropdown: {
                ...this.state.reimDropdown,
                selection: 'All'
            }
        });
        console.log(reimFromServer);
    }

    // getById = async (reim: Reimbursement) => {
    //     const resp = await fetch(environment.context + '/reimbursements/id/' + reim.reimbursementid, {
    //         //credentials: 'include'
    //     });
    //     const reimFromServer = await resp.json();
    //     this.setState({
    //         reim: reimFromServer,
    //         byId: reimFromServer,
    //         reimDropdown: {
    //             ...this.state.reimDropdown,
    //             selection: reim.reimbursementid
    //         }
    //     });
    //     console.log(reimFromServer);
    // }

    toggleReimDropdown = () => {
        this.setState({
            reimDropdown: {
                ...this.state.reimDropdown,
                isOpen: !this.state.reimDropdown.isOpen
            }
        });
    }

    render() {
        const reimbursements = this.state.reim;
        return (
            <div id="reimbursements-table-container">
                <ButtonDropdown id="reimbursement-dropdown"
                    isOpen={this.state.reimDropdown.isOpen}
                    toggle={this.toggleReimDropdown}>

                    <DropdownToggle caret>
                        {this.state.reimDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getReimbersments}>All</DropdownItem>
                        <DropdownItem divider />
                        {
                            // this.state.reim.map(reim => (
                            //     <DropdownItem key={'reim-dropdown-' + reim.reimbursementid}
                            //         // onClick={() => this.getById(reim.reimbursementid)}>
                            //         // {reim.reimbursementid}
                            //     </DropdownItem>
                            // ))
                        }
                    </DropdownMenu>
                </ButtonDropdown>

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Amount</th>
                            <th scope="col">Datesubmitted</th>
                            <th scope="col">Dateresolved</th>
                            <th scope="col">Description</th>
                            <th scope="col">Author</th>
                            <th scope="col">Resolver</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reimbursements.map(reimbursement =>
                                <tr key={'reimbursementId-' + reimbursement.reimbursementid}>
                                    <td>{reimbursement.amount}</td>
                                    <td>{reimbursement.datesubmitted}</td>
                                    <td>{reimbursement.dateresolved && reimbursement.dateresolved}</td>
                                    <td>{reimbursement.description}</td>
                                    <td>{reimbursement.authorid.firstname}</td>
                                    <td>{reimbursement.resolverid.firstname}</td>
                                    <td>{reimbursement.statusid.status}</td>
                                    <td>{reimbursement.typeid.type}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}