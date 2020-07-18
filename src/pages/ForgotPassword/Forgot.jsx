import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            isLoading: false,
            actionSuccess: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.type]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true,
        });

        Axios
        .post(`${process.env.REACT_APP_API_URL}/forgot-password`, {
            email: this.state.email
        })
        .then(res => {
            if(res.data){
                return this.setState({
                    isLoading: false,
                    actionSuccess: true,
                    email: ''
                });
            }
        })
        .catch(err => {
            swal('Oops..', err.response.data ? err.response.data.message : 'Error occured please contact support!', 'error');
            return this.setState({
                isLoading: false
            })
        });
    }

    render() { 
        return (
            <main className='bg-dark'>
                <div className='container'>
                    <div className='row m-h-100 '>
                        <div className='col-md-8 col-lg-4  m-auto'>
                            <div className='card shadow-lg '>
                                <div className='card-body '>
                                    <div className=' padding-box-2 '>
                                        <div className='text-center p-b-20 pull-up-sm'>

                                            <div className='avatar avatar-lg'>
                                                <span className='avatar-title rounded-circle bg-pink'> 
                                                    <i className='mdi mdi-key-change'></i> 
                                                </span>
                                            </div>

                                        </div>
                                        <h3 className='text-center'>Reset Password</h3>
                                        {
                                            this.state.actionSuccess ? 
                                            <div className='alert alert-success' role='alert'>
                                                An email has been sent to your email, please check the email to reset your password.
                                            </div> : ''
                                        }
                                        <form onSubmit={(e) => this.handleSubmit(e)}>
                                            <div className='form-group'>
                                                <label>Email</label>

                                                <div className='input-group input-group-flush mb-3'>
                                                    <input type='email' className='form-control form-control-prepended'
                                                        placeholder='yourmail@example.com' name='email' value={this.state.email} onChange={(e) => this.handleChange(e)} />
                                                    <div className='input-group-prepend'>
                                                        <div className='input-group-text'>
                                                            <span className=' mdi mdi-email '></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className='small'>
                                                    We will send a reset link to your registered E-Mail
                                                </p>
                                            </div>

                                            <div className='form-group'>
                                                <button onSubmit={(e) => this.handleSubmit(e)} type='submit' className='btn text-uppercase btn-block  btn-primary'>
                                                    {
                                                        this.state.isLoading ? <div className="spinner-border text-secondary" role="status"><span className="sr-only">Loading...</span></div> : 'Reset'
                                                    }
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                            <div className='text-light m-t-15'>
                                <Link to='/login' className='text-underline'>&lt; Login Page</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default ForgotPassword;