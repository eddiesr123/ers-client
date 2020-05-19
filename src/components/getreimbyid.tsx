import React from 'react';
import Axios from 'axios';
import '../App.css';
import { getJwt } from '../helpers/jwt';
import Table from 'react-bootstrap/Table'
import AdminNavComponent from './adminnavportal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


export class GetReimbursementsIdComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = { 
            reimbursements: [],
            inputValue: '',
            show: false
        };
    }

    updateValue(e: any) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            inputValue: value
        });
    }

    getReimbursements() {
        const jwt = getJwt();
        const url = `http://localhost:9000/admin/reimbursements/auth/${this.state.inputValue}`;
        console.log(url);

        Axios.get(url, { headers: { authorization: `${jwt}` } }).then(payload => {
            console.log(payload);

            this.setState({ reimbursements: payload.data,
                show: true
            })
        }).catch (() => {
            alert('User does not exist');
        });
    }

    render() {

        return (
            <div>
            <AdminNavComponent />
            <div className="App">
                <div style={{overflowX: "auto"}}>

                     <h3 style={{textAlign: "center"}}>View Reimbursements by Employee ID</h3>

                     {this.state.show &&
                     <div>
                            <h6>Status Codes: 1 = Pending, 2= Approved, 3= Denied</h6>
                     <Table  style={{backgroundColor: "white"}} striped bordered hover size="sm">
                                <thead>
                                <tr>
                                    <th>Reimbursement ID</th>
                                    <th>Author</th>
                                    <th>Amount</th>
                                    <th>Date Submitted</th>
                                    <th>Date Resolved</th>
                                    <th>Description</th>
                                    <th>Resolver</th>
                                    <th>Status</th>
                                    <th>Type</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.reimbursements.map((reimbursement: any) => {
                                    return (
                                        <tr>
                                        <td>{reimbursement.reimbursementid}</td>
                                        <td>{reimbursement.author}</td>
                                        <td>{reimbursement.amount}</td>
                                        <td>{reimbursement.datesubmitted}</td>
                                        <td>{reimbursement.dateresolved}</td>
                                        <td>{reimbursement.description}</td>
                                        <td>{reimbursement.resolver}</td>
                                        <td>{reimbursement.status}</td>
                                        <td>{reimbursement.type}</td>
                                        </tr>
                                    )
                                })
                                }
                                </tbody>
                                </Table>
                                </div>
                    }
               
                </div>
                <div>
                <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label></Form.Label>
                    <Form.Control placeholder="Employee ID" type="text"
                        value={this.state.inputValue}
                        onChange={(e: any) => this.updateValue(e)} />
               </Form.Group>
               </Form>
                    <Button style={{marginLeft:"60px"}} variant="light" onClick={() => this.getReimbursements()}>View Info</Button>
                </div>
            </div>
            </div>
        );
    }

}