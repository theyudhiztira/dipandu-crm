import React, { Component } from 'react';
import { registerServices } from '../../services/authServices';
import swal from 'sweetalert';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import './Register.css';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            company_name: '',
            employee_number: '',
            company_website: '',
            isLoading: false,
            isRegisterSuccess: false
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
        console.log(e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleLogin = async (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        const doRegister = await registerServices(this.state);
        if(doRegister.error){
            swal("Oops", doRegister.response.data.message, "error");
            this.setState({
                isLoading: false
            });
            return false;
        }else{
            this.setState({
                isLoading: false,
                isRegisterSuccess: true,
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                company_name: '',
                employee_number: '',
                company_website: ''
            });
        }
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="col-12">
                    <form className="row align-items-center m-h-100" onSubmit={(e) => console.log(this.handleLogin(e))}>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7 col-xl-5 mx-auto">
                            <div className="p-b-20 text-center">
                            <img alt='DiPandu CRM' src={logo} width="80" />
                            </div>
                            <h4 className="text-center">
                                {this.getGreeting()}, glad to see you here
                            </h4>
                            <p className="text-center">
                            Boost your team productivity with <b>DiPandu CRM</b>
                            </p>
                            <div className="login-box">
                            <form>
                                {this.state.isRegisterSuccess ? <div className='row m-b-5'>
                                    <div className='col-12'>
                                        <div class='alert alert-success' role='alert'>
                                            <h4 class='alert-heading'>Well done!</h4>
                                            <p>Aww yeah, you successfully signed up to our services. Please check your email inbox to activate your account.</p>
                                            <hr />
                                            <p class='mb-0'>You won't be able to use our service before activating your account.</p>
                                        </div>
                                    </div>
                                </div> : ''}
                                <div className='form-row p-l-5 m-b-5'>
                                    <h5>Account Details</h5>
                                </div>
                                <div className='form-row'>
                                    <div className='form-group col-6 floating-label'>
                                        <label>Full Name</label>
                                        <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Full Name'
                                        name='name'
                                        value={this.state.name}
                                        onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group col-6 floating-label'>
                                        <label>Email</label>
                                        <input
                                        type='email'
                                        className='form-control'
                                        placeholder='Email'
                                        name='email'
                                        value={this.state.email}
                                        onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className='form-row m-b-15'>
                                    <div className='form-group col-6 floating-label'>
                                        <label>Password</label>
                                        <input
                                        type='password'
                                        className='form-control'
                                        placeholder='Password'
                                        name='password'
                                        value={this.state.password}
                                        onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group col-6 floating-label'>
                                        <label>Password Confirmation</label>
                                        <input
                                        type='password'
                                        className='form-control'
                                        placeholder='Password Confirmation'
                                        name='password_confirmation'
                                        value={this.state.password_confirmation}
                                        onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                                
                                <div className='form-row p-l-5 m-b-5'>
                                    <h5>Company Info</h5>
                                </div>
                                <div className='form-row'>
                                    <div className='form-group col-6 floating-label'>
                                        <label>Company Name</label>
                                        <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Company Name'
                                        name='company_name'
                                        value={this.state.company_name}
                                        onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group col-6 floating-label'>
                                        <label>Company Website</label>
                                        <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Company Website'
                                        name='company_website'
                                        value={this.state.company_website}
                                        onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className='form-row m-b-15'>
                                    <div className='form-group col-12 floating-label'>
                                        <label>Team Size</label>
                                        <select className='form-control' name='employee_number' onChange={(e) => this.handleChange(e)}>
                                            <option selected={this.state.employee_number? false : true} disabled>Team Size</option>
                                            <option selected={this.state.employee_number === '1' ? true : false} value='1'>1</option>
                                            <option selected={this.state.employee_number === '2-5' ? true : false} value='2-5'>2 - 5</option>
                                            <option selected={this.state.employee_number === '6-25' ? true : false} value='6-25'>6 - 25</option>
                                            <option selected={this.state.employee_number === '25-50' ? true : false} value='25-50'>25 - 50</option>
                                            <option selected={this.state.employee_number === '50-100' ? true : false} value='50-100'>51 - 100</option>
                                            <option selected={this.state.employee_number === '100' ? true : false} value='100'>More than 100</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-group w-100 mb-0'>
                                        <button
                                        type='submit'
                                        className='btn btn-primary btn-block btn-lg'
                                        onClick={(e) => this.handleLogin(e)} disabled={this.state.isLoading ? true : false}
                                        >
                                            {
                                                this.state.isLoading ? <div class='spinner-border text-secondary' role='status'><span class='sr-only'>Loading...</span></div> : 'Sign Up'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                            </div>
                            <div className='w-100 text-center mt-4'>
                            Already have an account? <Link className='text-underline' to='/login'>Sign In</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default (Home);