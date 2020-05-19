import React from 'react';
import Axios from 'axios';
import '../App.css';
import { getJwt } from '../helpers/jwt';
import { getUserId } from '../helpers/userid';
import EmployeeNavComponent from './employeenavportal';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';


export class UserGetReimbursementsIdComponent extends React.Component<any, any> {
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
        const id = getUserId();
        const url = `http://localhost:9000/user/reimbursements/userid/${id}`;
        console.log(url);

        Axios.get(url, { headers: { authorization: `${jwt}` } }).then(payload => {
            console.log(payload);

            this.setState({ reimbursements: payload.data,
                show: true
            })
        });
    }

    render() {

        return (
            <div>
            <EmployeeNavComponent />
            <div className="App">
                <div style={{overflowX: "auto"}}>

                     <h3 style={{textAlign: "center"}}>Reimbursement Status</h3>
                            
                     {this.state.show &&
                    <div>
                           <h6>Status Codes: 1 = Pending, 2= Approved, 3= Denied</h6>
                     <Table style={{backgroundColor: "white"}} striped bordered hover size="sm">
                         
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
                {!this.state.show &&
                    <Button variant="light" onClick={() => this.getReimbursements()}>View Info</Button>
                }
                </div>
            </div>
            </div>
        );
    }

}