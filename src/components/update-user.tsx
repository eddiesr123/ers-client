import React from 'react';
import Axios from 'axios';
import { getJwt } from '../helpers/jwt';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import AdminNavComponent from './adminnavportal';
import Button from 'react-bootstrap/Button';

export class UpdateUserComponent extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			/* userid: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',*/
			show: false
		};
		this.onChangePost = this.onChangePost.bind(this);
	}

	onChangePost(event: any) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	async onSubmit() {
		const jwt = getJwt();
		const headers = { Authorization: jwt, 'Content-Type': 'application/json' };
		const url = `http://localhost:9000/admin/updateuser`;

		const user = {
			userid: this.state.userid,
			username: this.state.username,
			password: this.state.password,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			role: this.state.role
		};

		const response = await Axios({
			method: 'patch',
			url: url,
			headers: headers,
			data: user
		});

		this.setState({
			...this.state,
			userid: response.data.userid,
			username: response.data.username,
			password: response.data.password,
			firstName: response.data.firstname,
			lastName: response.data.lastname,
			email: response.data.email,
			role: response.data.role,
			show: true
		});
	}

	render() {
		return (
			<div>
				<AdminNavComponent />
				<div className="App">
					{this.state.show && (
						<div style={{ overflowX: 'auto' }}>
							<h3 style={{ textAlign: 'center' }}>Employee Information Updated</h3>

							<Table style={{ backgroundColor: 'white' }} striped bordered hover size="sm">
								<thead>
									<tr>
										<th>Employee ID</th>
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
					)}

					{!this.state.show && (
						<Form>
							<h3>Update Employee Information</h3>
							<Form.Group controlId="exampleForm.ControlInput1">
								<Form.Control
									placeholder="Employee ID"
									type="text"
									className="form-control"
									onChange={(event: any) => this.onChangePost(event)}
									name="userid"
								/>
								<Form.Label />
								<Form.Control
									placeholder="Username"
									type="text"
									className="form-control"
									onChange={(event: any) => this.onChangePost(event)}
									name="username"
								/>
								<Form.Label />
								<Form.Control
									placeholder="Password"
									type="text"
									className="form-control"
									onChange={(event: any) => this.onChangePost(event)}
									name="password"
								/>
								<Form.Label />
								<Form.Control
									placeholder="First Name"
									type="text"
									className="form-control"
									onChange={(event: any) => this.onChangePost(event)}
									name="firstName"
								/>
								<Form.Label />
								<Form.Control
									placeholder="Last Name"
									type="text"
									className="form-control"
									onChange={(event: any) => this.onChangePost(event)}
									name="lastName"
								/>
								<Form.Label />
								<Form.Control
									placeholder="Email"
									type="text"
									className="form-control"
									onChange={(event: any) => this.onChangePost(event)}
									name="email"
								/>
							</Form.Group>
							<Form.Group controlId="exampleForm.ControlSelect1">
								<Form.Label />
								<Form.Control
									as="select"
									type="text"
									className="form-control"
									onChange={(event) => this.onChangePost(event)}
									name="role"
								>
									<option>Role</option>
									<option value="2">Employee</option>
									<option value="1">Manager</option>
								</Form.Control>
							</Form.Group>
						</Form>
					)}
					{!this.state.show && (
						<Button variant="light" onClick={() => this.onSubmit()}>
							Submit
						</Button>
					)}
				</div>
			</div>
		);
	}
}
