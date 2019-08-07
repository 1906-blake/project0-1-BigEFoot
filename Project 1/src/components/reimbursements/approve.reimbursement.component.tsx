import React, { Component } from "react";
import Reimbursement from "../../models/reimbursements";
import { environment } from "../../environment";
import ReimbursementStatus from "../../models/reimbursementsStatus";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';




interface IState {
    reim: Reimbursement[],
    byStatus: ReimbursementStatus[],
    reimDropdown: {
        isOpen: boolean,
        selection: any
    }
}

export default class ApproveDeny extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reim: [],
            byStatus: [],
            reimDropdown: {
                isOpen: false,
                selection: 'All'
            }
        };
    }

    async componentDidMount() {
        this.getStatus();
    }

    getStatus = async () => {
        const resp = await fetch(environment.context + '/reimbursements/status', {
            credentials: 'include'
        });
        const byStatus = await resp.json();
        this.setState({
            byStatus
        });
        console.log(byStatus);
    }

    getReimByStatus = async (byStatus: ReimbursementStatus) => {
        const resp = await fetch(environment.context + '/reimbursements/status/' + byStatus.statusid, {
            credentials: 'include'
        });
        const reimFromServer = await resp.json();
        this.setState({
            byStatus: reimFromServer,
            reimDropdown: {
                ...this.state.reimDropdown,
                selection: byStatus.status
            }
        });
    }

    getReimbursements = async () => {
        const resp = await fetch(environment.context + '/reimbursements', {
            credentials: 'include'
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

    toggleReimDropdown = () => {
        this.setState({
            reimDropdown: {
                ...this.state.reimDropdown,
                isOpen: !this.state.reimDropdown.isOpen
            }
        });
    }

    approveReim = async (reimbursementid: any) => {
        const body = {
            reimbursementid,
            status: {
                statusId: 2
            }
        }
        await fetch('http://localhost:8012/reimbursements', {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });
        this.getReimbursements();
    }
    denyReim = async (reimbursementId: any) => {
        const body = {
            reimbursementId,
            status: {
                statusId: 3
            }
        }
        await fetch('http://localhost:8012/reimbursements', {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });
        this.getReimbursements();
    }

    getApDeButtons = (reimid: number, reimSta: number) => {
        const currentUser = localStorage.getItem('user');
        const user = currentUser && JSON.parse(currentUser);
        console.log('userid: ' + user.userid);
        if (user.role.roleid === 1) {
            if (reimSta === 1) {
                return (<td>
                    <Button color='success' onClick={() => this.approveReim(reimid)}>Approve</Button>
                    <Button color='warning' onClick={() => this.denyReim(reimid)}>Deny</Button>
                </td>)
            }
        }
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
                        <DropdownItem onClick={this.getReimbursements}>All</DropdownItem>
                        <DropdownItem divider />
                        {
                            this.state.byStatus.map(byStatus => (
                                <DropdownItem key={"status dropdown" + byStatus.statusid} onClick={() => this.getReimByStatus(byStatus)}>
                                    {byStatus.status}
                                </DropdownItem>
                            ))
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
                                <tr key={'reimbursement ID-' + reimbursement.reimbursementid}>
                                    <td>{reimbursement.amount}</td>
                                    <td>{reimbursement.datesubmitted}</td>
                                    <td>{reimbursement.dateresolved && reimbursement.dateresolved}</td>
                                    <td>{reimbursement.description}</td>
                                    <td>{reimbursement.author.firstname}</td>
                                    <td>{reimbursement.resolver.firstname}</td>
                                    <td>{reimbursement.status.status}</td>
                                    <td>{reimbursement.type.type}</td>
                                    {this.getApDeButtons(reimbursement.reimbursementid, reimbursement.status.statusid)}
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
