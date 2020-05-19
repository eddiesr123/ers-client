import * as React from 'react';
import { Link } from 'react-router-dom';
import NavComponent from './nav-component';
import Button from 'react-bootstrap/Button';


export class HomeComponent extends React.Component<any, any> {

    render() {
        return (
        <div>
            <NavComponent />
            <div className="App">
                <div className="App">
                <h1 style={{marginBottom:"50px"}}>Expense Reimbursement System</h1>
                    <h3>Employees</h3>
                    <Button variant="light">
                            <Link to="/userlogin"
                                className="unset-anchor nav-link">Login Here
                            </Link>
                    </Button>
                    <h3>Managers</h3>
                    <Button variant="light">
                            <Link to="/adminlogin"
                                className="unset-anchor nav-link">Login Here
                            </Link>
                    </Button>
                </div>
            </div>
        </div>
        );
    }
}