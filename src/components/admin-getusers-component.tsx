import React from 'react';
import Axios from 'axios';
import '../App.css';
import { getJwt } from '../helpers/jwt';
import Table from 'react-bootstrap/Table'
import AdminNavComponent from './adminnavportal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


interface AdminGetUsersState {
    userid: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    inputValue: string,
    show: boolean
}

export class AdminGetUsersComponent extends React.Component<any, AdminGetUsersState> {
    constructor(props: any) {
        super(props);

        this.state = {
            userid: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            role: '',
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

    getUserById() {
        const jwt = getJwt();
        const url = `http://localhost:9000/admin/getusers/${this.state.inputValue}`;
        console.log(url);

        Axios.get(url, { headers: { authorization: `${jwt}` } }).then(payload => {
            console.log(payload);

            this.setState({
                ...this.state,
                userid: payload.data[0].userid,
                username: payload.data[0].username,
                password: payload.data[0].password,
                firstName: payload.data[0].firstname,
                lastName: payload.data[0].lastname,
                email: payload.data[0].email,
                role: payload.data[0].role,
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

            {this.state.show &&
                <div style={{overflowX: "auto"}}>

                     <h3 style={{textAlign: "center"}}>Employee Search by ID</h3>
                     <Table style={{backgroundColor: "white"}} striped bordered hover size="sm">

                            <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td>{this.state.userid}</td>
                                        <td>{this.state.username}</td>
                                        <td>{this.state.password}</td>
                                        <td>{this.state.firstName}</td>
                                        <td>{this.state.lastName}</td>
                                        <td>{this.state.email}</td>
                                        <td>{this.state.role}</td>
                                    </tr>

                            </tbody>
                            </Table>
                </div>
            }
                <div>
                <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label></Form.Label>
                    <Form.Control placeholder="Employee ID" type="text"
                        value={this.state.inputValue}
                        onChange={(e: any) => this.updateValue(e)} />
               </Form.Group>
               </Form>
               <Button style={{marginLeft:"60px"}} variant="light" onClick={() => this.getUserById()}>View Info</Button>
                </div>
        
            </div>
            </div>
        );
    }

}