import React, { Component } from 'react';
import { loginService } from '../../services/authServices';
import { loginSuccess } from '../../actions/authActions';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import logo from '../../logo.svg';
import './Login.css';
import { Link } from 'react-router-dom';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    getGreeting = () => {
        var e = new Date().getHours();

        return e < 12
        ? "Good Morning"
        : e < 18
        ? "Good Afternoon"
        : "Good Evening";
    }

    handleChange = (e) => {
        this.setState({
            [e.target.type]:e.target.value
        })
    }

    handleLogin = async (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        const doLogin = await loginService(this.state.email, this.state.password);
        if(doLogin.error){
            swal("Oops", doLogin.response.data.message, "error");
            this.setState({
                isLoading: false
            });
            return false;
        }else{
            localStorage.setItem('token', doLogin.data.token);
            this.props.accessGranted(doLogin.data.token);
            this.setState({
                isLoading: false
            });
        }
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="col-12">
                    <form className="row align-items-center m-h-100" onSubmit={(e) => console.log(this.handleLogin(e))}>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-3 mx-auto">
                            <div className="p-b-20 text-center">
                            <img alt='DiPandu CRM' src={logo} width="80" />
                            </div>
                            <h4 className="text-center">
                                {this.getGreeting()}, good to see you again
                            </h4>
                            <p className="text-center">
                            Login to access the <b>DiPandu CRM</b>
                            </p>
                            <div className="login-box">
                                <div className="form-row">
                                    <div className="form-group w-100 floating-label">
                                        <label>Email</label>
                                        <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="form-group w-100 floating-label">
                                        <label>Password</label>
                                        <input
                                        type="password"
                                        className="form-control m-b-10"
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={(e) => this.handleChange(e)}
                                        />
                                        <Link to='/forgot' className='text-underline'>
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="form-group w-100 mb-0">
                                        <button
                                        type="submit"
                                        className="btn btn-primary btn-block btn-lg"
                                        onSubmit={(e) => this.handleLogin(e)} disabled={this.state.isLoading ? true : false}
                                        >
                                            {
                                                this.state.isLoading ? <div className="spinner-border text-secondary" role="status"><span className="sr-only">Loading...</span></div> : 'Login'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-100 text-center mt-4">
                            <Link className='text-underline' to='/register'>Create new account</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

// const dispact

const mapDispatchToProps = (dispatch) => {
    return {
        accessGranted: (token) => { console.log(token); dispatch(loginSuccess(token)); }
    }
}

export default connect(null, mapDispatchToProps)(Home);