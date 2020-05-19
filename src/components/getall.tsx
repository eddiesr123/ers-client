import React from 'react';
import Axios from 'axios';
import '../App.css';
import { getJwt } from '../helpers/jwt';
import Table from 'react-bootstrap/Table'
import AdminNavComponent from './adminnavportal';
import Button from 'react-bootstrap/Button';


export class GetAllUsersComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = { users: [],
        show: false };
    }

    getUsers() {
        const jwt = getJwt();
        const url = `http://localhost:9000/admin/getusers`;
        console.log(url);

        Axios.get(url, { headers: { authorization: `${jwt}` } }).then(payload => {
            console.log(payload);

            this.setState({ users: payload.data,
                show: true
            })
        });
    }

    render() {

        return (
            <div>
                <AdminNavComponent />
                <div className="App">
                    <div style={{overflowX: "auto"}}>

                        <h3 style={{textAlign: "center"}}>View All Employees</h3>

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


                                        {this.state.users.map((user: any) => {
                                                return (
                                            <tr>
                                                <td>{user.userid}</td>
                                                <td>{user.username}</td>
                                                <td>{user.password}</td>
                                                <td>{user.firstname}</td>
                                                <td>{user.lastname}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>

                                            </tr>
                                        )
                                    })
                                }

                                </tbody>
                                
                            </Table>
                        }
                          {!this.state.show &&
                        <Button variant="light" style={{marginLeft: "75px"}} onClick={() => this.getUsers()}>View Info</Button>
                          }
                    </div>
                </div>
            </div>
        );
    }

}