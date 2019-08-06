import React, { Component } from 'react';
import Reimbursement from '../../models/reimbursements';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { environment } from '../../environment';
import ReimbursementStatus from '../../models/reimbursementsStatus';
import Users from '../../models/users';

interface IState {
    reim: Reimbursement[],
    byStatus: ReimbursementStatus[],
    byAuthId: Users[],
    reimDropdown: {
        isOpen: boolean,
        selection: any
    }
}

export default class Reimbursements extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reim: [],
            byStatus: [],
            byAuthId: [],
            reimDropdown: {
                isOpen: false,
                selection: 'All'
            }
        };
    }

    async componentDidMount() {
        this.getReimbersments()
        this.getStatus()
        this.getAuthId()
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

    getStatus = async () => {
        const resp = await fetch(environment.context + '/reimbursements/status', {
            //credentials: 'include'
        });
        const byStatus = await resp.json();
        this.setState({
            byStatus
        });
        console.log(byStatus);
    }

    getReimByStatus = async (byStatus: ReimbursementStatus) => {
        const resp = await fetch(environment.context + '/reimbursements/status/' + byStatus.statusid, {
            //credentials: 'include'
        });
        const reimFromServer = await resp.json();
        this.setState({
            reim: reimFromServer,
            reimDropdown: {
                ...this.state.reimDropdown,
                selection: byStatus.status
            }
        });
    }

    getAuthId = async () => {
        const resp = await fetch(environment.context + '/users', {
            //credentials: 'include'
        });
        const byAuthId = await resp.json();
        this.setState({
            byAuthId
        });
        console.log(byAuthId);
    }

    getReimByAuthId = async (byAuthId: Users) => {
        const resp = await fetch(environment.context + '/reimbursements/author/' + byAuthId.userid, {
            //credentials: 'include'
        });
        const reimFromServer = await resp.json();
        this.setState({
            reim: reimFromServer
        
        });
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
                                this.state.byStatus.map(byStatus => (
                                    <DropdownItem key={"status dropdown" + byStatus.statusid} onClick={() => this.getReimByStatus(byStatus)}>
                                        {byStatus.status}
                                    </DropdownItem>
                                ))
                            }
                            {
                                this.state.byAuthId.map(byAuthId => (
                                    <DropdownItem key={"author dropdown" + byAuthId.userid} onClick={() => this.getReimByAuthId(byAuthId)}>
                                        {byAuthId.userid}
                                    </DropdownItem>
                                ))
                            }
                        </DropdownMenu>
                    </ButtonDropdown>

                    {/* <ButtonDropdown id="employee-dropdown"
                        isOpen={this.state.reimDropdown.isOpen}
                        toggle={this.toggleReimDropdown}>

                        <DropdownToggle caret>
                            {this.state.reimDropdown.selection}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={this.getReimbersments}>All</DropdownItem>
                            <DropdownItem divider />
                            
                        </DropdownMenu>
                    </ButtonDropdown> */}

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
                                        <td>{reimbursement.author.firstname}</td>
                                        <td>{reimbursement.resolver.firstname}</td>
                                        <td>{reimbursement.status.status}</td>
                                        <td>{reimbursement.type.type}</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    }