import * as React from 'react';
import AdminNavComponent from './adminnavportal';


export class AdminPortalComponent extends React.Component<any, any> {

    render() {
        return (
        <div>
            <AdminNavComponent />
            <div className="App">
                <h1>MANAGER PORTAL</h1>

            </div>
            
        </div>
        );
    }
}