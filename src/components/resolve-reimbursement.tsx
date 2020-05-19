import React from 'react';
import Axios from 'axios';
import { getJwt } from '../helpers/jwt';
import { getUserId } from '../helpers/userid';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import AdminNavComponent from './adminnavportal';
import Button from 'react-bootstrap/Button';

export class PatchReimbursement extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			reimbursementid: '',
			dateresolved: new Date(),
			resolver: getUserId(),
			status: ''
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
		const url = `http://localhost:9000/admin/reimbursements/resolve`;

		const reimbursement = {
			reimbursementId: this.state.reimbursementid,
			dateResolved: this.state.dateresolved,
			resolver: this.state.resolver,
			status: this.state.status
		};

		const response = await Axios({
			method: 'patch',
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
			dateresolved: response.data.dateresolved,
			description: response.data.description,
			resolver: response.data.resolver,
			status: response.data.status,
			type: response.data.type
		});
	}

	render() {
		return (
			<div>
				<AdminNavComponent />
				<div className="App">
					{this.state.reimbursementId && (
						<div style={{ overflowX: 'auto' }}>
							<h3 style={{ textAlign: 'center' }}>
								Request: <b>{this.state.status === 2 ? 'APPROVED' : 'DENIED'}</b>
							</h3>

							<h6>Status Codes: 1 = Pending, 2= Approved, 3= Denied</h6>
							<Table style={{ backgroundColor: 'white' }} striped bordered hover size="sm">
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
									<tr>
										<td>{this.state.reimbursementId}</td>
										<td>{this.state.author}</td>
										<td>{this.state.amount}</td>
										<td>{this.state.datesubmitted}</td>
										<td>{this.state.dateresolved}</td>
										<td>{this.state.description}</td>
										<td>{this.state.resolver}</td>
										<td>{this.state.status}</td>
										<td>{this.state.type}</td>
									</tr>
								</tbody>
							</Table>
						</div>
					)}

					{!this.state.reimbursementId && (
						<Form>
							<h3>Resolve Expense Reimbursement Request</h3>
							<Form.Group controlId="exampleForm.ControlInput1">
								<Form.Label>Reimbursement ID</Form.Label>
								<Form.Control
									placeholder="Reimbursement ID"
									type="text"
									className="form-control"
									onChange={(event: any) => this.onChangePost(event)}
									name="reimbursementid"
								/>
							</Form.Group>
							<Form.Group controlId="exampleForm.ControlSelect1">
								<Form.Label>Status</Form.Label>
								<Form.Control
									as="select"
									type="text"
									className="form-control"
									onChange={(event) => this.onChangePost(event)}
									name="status"
								>
									<option>Status</option>
									<option value="2">Approved</option>
									<option value="3">Denied</option>
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
