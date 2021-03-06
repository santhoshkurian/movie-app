
import React, { Component } from "react";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { Row, Col } from "react-bootstrap";
import axios from 'axios';

import { Auth } from "components/Auth/PrivateRoute.jsx";






export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this)
    this.state = { login: { email: null, password: null },message:null }
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)


  }

  componentDidMount() {
    if (localStorage.getItem('token') != null && localStorage.getItem('role') === "ROLE_ADMIN") {
      this.props.history.push('/admin/dashboard')
    }
    if (localStorage.getItem('token') != null && localStorage.getItem('role') === "ROLE_USER") {
      this.props.history.push('/user/dashboard')
    }
  }


  handleChange(e) {
   // console.log("check", e.target.value)

    const data = this.state.login;
    data[e.target.name] = e.target.value
    this.setState({ login: data });
    //console.log(this.state.login)
  }

  handleLogin(e) {
    const login = this.state.login;

    axios.post('http://localhost:4000/api/auth', login)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('name', res.data.name);
        Auth.authenticate();
        if (res.data.role == "ROLE_ADMIN") {
          this.props.history.push('/admin/dashboard')
        } else {
          this.props.history.push('/user/dashboard')
        }
      })
      .catch(error => {
        this.setState({ message:"Invalid Username or Password" });
        Auth.authenticate();
        console.log(error.response.data.msg)

      });


  }

  render() {
    return (
      <div className="card card-user">
        <div className="content">
          <div className="author" style={{ marginTop: 0 }}>
            <a >
              <img
                className="avatar border-gray"
                src={this.props.avatar}
                alt="..."
              />
              <Row>
                <Col md={4}></Col>
                <Col md={4}>
                  <Card
                    title="Log In"
                    content={
                      <div>
                        <span style={{color: "red"}}>{this.state.message}</span>

                        <form >
                          <FormInputs
                            ncols={["col-md-12"]}
                            properties={[
                              {
                                label: "",
                                type: "text",
                                name: "email",
                                onChange: this.handleChange,
                                bsClass: "form-control ",
                                placeholder: "Username",
                                defaultValue: ""
                              }
                            ]}
                          />
                          <FormInputs
                            ncols={["col-md-12"]}
                            properties={[
                              {
                                label: "",
                                type: "password",
                                name: "password",
                                onChange: this.handleChange,
                                bsClass: "form-control ",
                                placeholder: "Password",
                                defaultValue: ""
                              }
                            ]}
                          />
                          <Button bsStyle="info" pullRight fill onClick={this.handleLogin}>Log In</Button>
                          <div className="clearfix" />
                        </form>
                      </div>
                    }
                  />
                </Col>

              </Row>

            </a>
          </div>
          <p className="description text-center">
          </p>
        </div>
        <hr />
        <div className="text-center">

        </div>
      </div>
    );
  }
}

export default LoginForm;
