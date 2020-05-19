import React from 'react';
import './include/bootstrap';
import './App.css';
import { HashRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { GetUsersComponent } from './components/getusers-component';
import Login from './components/login-compnonent';
import AdminLogin from './components/admin-login-component';
import { AdminGetUsersComponent } from './components/admin-getusers-component';
import { HomeComponent } from './components/home-component';
import { GetAllUsersComponent } from './components/getall';
import { EmployeePortalComponent } from './components/employee-portal';
import { AdminPortalComponent } from './components/admin-portal';
import { GetReimbursementsStatusComponent } from './components/getreimbystatus';
import { UserGetReimbursementsIdComponent } from './components/usergetreimbursement';
import { PostReimbursement } from './components/postreimbursement';
import { GetReimbursementsIdComponent } from './components/getreimbyid';
import { PatchReimbursement } from './components/resolve-reimbursement';
import { UpdateUserComponent } from './components/update-user';

const App: React.FC = () => {
	return (
		<div>
			<HashRouter>
				<Switch>
					<Route path="/" exact component={HomeComponent} />
					<Route path="/userlogin" component={Login} />
					<Route path="/adminlogin" component={AdminLogin} />
					<Route path="/user" component={EmployeePortalComponent} />
					<Route path="/myinfo" component={GetUsersComponent} />
					<Route path="/reimburementstatus" component={UserGetReimbursementsIdComponent} />
					<Route path="/postreimbursement" component={PostReimbursement} />
					<Route path="/admin" component={AdminPortalComponent} />
					<Route path="/getuserbyid" component={AdminGetUsersComponent} />
					<Route path="/getusers" component={GetAllUsersComponent} />
					<Route path="/updateuser" component={UpdateUserComponent} />
					<Route path="/reimbursementsid" component={GetReimbursementsStatusComponent} />
					<Route path="/reimbursementsauth" component={GetReimbursementsIdComponent} />
					<Route path="/resolvereimbursement" component={PatchReimbursement} />
				</Switch>
			</HashRouter>
		</div>
	);
};

export default App;
