import React from 'react';
import { getJwt } from '../helpers/jwt';
import { getUserId } from '../helpers/userid';
import Axios from 'axios';
import { getRole } from '../helpers/role';

class AuthenticationComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        const userid = getUserId();
        const role = getRole();

        if(!jwt) {
            localStorage.removeItem('cool-jwt');
            localStorage.removeItem('userid');
            localStorage.removeItem('role');
            this.props.history.push('/home')
        } else {
            this.setState({
                user: true
            })
        }

    }

    render() {
        if(this.state.user === undefined) {
            return (
                <div><h1>Loading...</h1></div>
            );
        }

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default AuthenticationComponent;