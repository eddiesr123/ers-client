import React from 'react';
import Axios from 'axios';
import '../App.css';
import { getJwt } from '../helpers/jwt';
import { getUserId } from '../helpers/userid';
import EmployeeNavComponent from './employeenavportal';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

interface GetUsersState {
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

export class GetUsersComponent extends React.Component<any, GetUsersState> {
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
        const id = getUserId();
        const url = `http://localhost:9000/user/profile/${id}`;
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
        });
    }

    render() {

        return (
            <div>
            <EmployeeNavComponent />
            <div className="App">
                <div style={{overflowX: "auto"}}>

                     <h3 style={{textAlign: "center"}}>My Account Info</h3>

                     {this.state.show &&
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
                     }
                </div>
                <div>
                {!this.state.show &&
                    <Button variant="light" onClick={() => this.getUserById()}>View Info</Button>
                }
                </div>
            </div>
            </div>
        );
    }

}