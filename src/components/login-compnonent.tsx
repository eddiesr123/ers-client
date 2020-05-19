import React from 'react';
import Axios from 'axios';
import NavComponent from './nav-component';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(e: any) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e: any) {
        e.preventDefault();
        Axios.post('/user/login', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            localStorage.setItem('cool-jwt', res.data.token);
            localStorage.setItem('userid', res.data.userid);
            localStorage.setItem('role', res.data.role);
            this.props.history.push('/user');
        }).catch (() => {
            alert('Invalid Credentials');
        });
    }

    render() {
        return(
            <div>
                <NavComponent/>
            <div className="App">
                <h1>Employee Portal Login</h1>
                <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label></Form.Label>
                    <Form.Control placeholder="Username" type="text" name="username" onChange={(e: any) => this.change(e)} value={this.state.username} />
                    <Form.Label></Form.Label>
                    <Form.Control placeholder="Password" type="password" name="password" onChange={(e: any) => this.change(e)} value={this.state.password} />
                    <br/>
                    <Button style={{marginLeft:"65px"}} variant="light" onClick={(e: any) => this.submit(e)}>Login</Button>
                </Form.Group>
                </Form>
            </div>
            </div>
        );
    }
}

export default Login;