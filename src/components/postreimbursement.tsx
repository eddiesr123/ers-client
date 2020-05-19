import React from 'react';
import Axios from 'axios';
import { getJwt } from '../helpers/jwt';
import { getUserId } from '../helpers/userid';
import Form from 'react-bootstrap/Form';
import EmployeeNavComponent from './employeenavportal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export class PostReimbursement extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			author: getUserId(),
			amount: '',
			datesubmitted: new Date(),
			description: '',
			status: 1,
			type: ''
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
		const url = `http://localhost:9000/user/reimbursements/postexpense`;

		const reimbursement = {
			author: this.state.author,
			amount: this.state.amount,
			datesubmitted: this.state.datesubmitted,
			description: this.state.description,
			status: this.state.status,
			type: this.state.type
		};

		const response = await Axios({
			method: 'post',
			url: url,
			headers: headers,
			data: reimbursement
		});

		this.setState({
			...this.state,
			reimbursementId: response.data.reimbursementid,
			author: response.data.author,
			amount: response.data.amount,
			datesubmitted: response.data.datesubmitted,
			description: response.data.description,
			status: response.data.status,
			type: response.data.type
		});
	}

	render() {
		return (
			<div>
				<EmployeeNavComponent />
				<div className="App">
					{this.state.reimbursementId && (
						<div style={{ overflowX: 'auto' }}>
							<h3 style={{ textAlign: 'center' }}>Request Sent: Pending Review</h3>

							<Table style={{ backgroundColor: 'white' }} striped bordered hover size="sm">
								<thead>
									<tr>
										<th>Reimbursement ID</th>
										<th>Author</th>
										<th>Amount</th>
										<th>Date Submitted</th>
										<th>Description</th>
										<th>Status</th>
										<th>Type</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{this.state.reimbursementId}</td>
										<td>{this.state.author}</td>
										<td>{this.state.amount}</td>
										<td>{this.state.datesubmitted}</td>
										<td>{this.state.description}</td>
										<td>{this.state.status}</td>
										<td>{this.state.type}</td>
									</tr>
								</tbody>
							</Table>
						</div>
					)}

					{!this.state.reimbursementId && (
						<Form>
							<h3>Expense Reimbursement Request</h3>
							<Form.Group controlId="exampleForm.ControlInput1">
								<Form.Label>Amount</Form.Label>
								<Form.Control
									placeholder="Amount"
									type="text"
									className="form-control"
									onChange={(event: any) => this.onChangePost(event)}
									name="amount"
								/>
								<Form.Label>Description</Form.Label>
								<Form.Control
									placeholder="Description"
									type="text"
									className="form-control"
									onChange={(event: any) => this.onChangePost(event)}
									name="description"
								/>
							</Form.Group>
							<Form.Group controlId="exampleForm.ControlSelect1">
								<Form.Label>Request Type</Form.Label>
								<Form.Control
									as="select"
									type="text"
									className="form-control"
									onChange={(event) => this.onChangePost(event)}
									name="type"
								>
									<option>Type</option>
									<option value="1">Lodging</option>
									<option value="2">Travel</option>
									<option value="3">Food</option>
									<option value="4">Other</option>
								</Form.Control>
							</Form.Group>
						</Form>
					)}
					{!this.state.reimbursementId && (
						<Button variant="light" onClick={() => this.onSubmit()}>
							Submit
						</Button>
					)}
				</div>
			</div>
		);
	}
}
