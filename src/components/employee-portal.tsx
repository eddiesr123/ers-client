import * as React from 'react';
import EmployeeNavComponent from './employeenavportal';


export class EmployeePortalComponent extends React.Component<any, any> {

    render() {
        return (
        <div>
             <EmployeeNavComponent />
            <div className="App">
                <h1>EMPLOYEE PORTAL</h1>

            </div>
            
        </div>
        );
    }
}