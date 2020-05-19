import * as React from 'react';
import { Link } from 'react-router-dom';
import RevLogo from '../assets/rev-logo.png';
import NavDropdown from 'react-bootstrap/NavDropdown';

const AdminNavComponent: React.FC = () => {
	return (
		<div>
			<nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
				<div className="navbar-header c-pointer shift-left">
					{
						<Link to="/home" className="unset-anchor">
							<img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
						</Link>
					}
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarsExample04"
					aria-controls="navbarsExample04"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarsExample04">
					<ul className="navbar-nav ml-auto margin-nav">
						<li className="nav-item active">
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#/getuserbyid">Employees (BY ID)</NavDropdown.Item>
								<NavDropdown.Item href="#/getusers">Employees (All)</NavDropdown.Item>
								<NavDropdown.Item href="#/updateuser">Employees (Update)</NavDropdown.Item>
								<NavDropdown.Item href="#/reimbursementsid">Reimbursements (Status)</NavDropdown.Item>
								<NavDropdown.Item href="#/reimbursementsauth">Reimbursements (BY ID)</NavDropdown.Item>
								<NavDropdown.Item href="#/resolvereimbursement">
									Resolve Reimbursements
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#/home">Logout</NavDropdown.Item>
							</NavDropdown>
						</li>
						<li className="nav-item active">
							<Link to="/home" className="unset-anchor nav-link">
								Home
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default AdminNavComponent;
