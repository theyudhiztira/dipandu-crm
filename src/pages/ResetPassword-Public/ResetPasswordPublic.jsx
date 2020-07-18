import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import Error404 from '../Errors/404';
import { Link } from 'react-router-dom';

class ResetPasswordPublic extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            isLoading: true,
            validToken: false,
            password: '',
            password_confirmation: '',
            resetSuccess: false
        }
    }

    componentWillMount()
    {
        const params = new URLSearchParams(this.props.location.search);

        if(!params.get('token')){
            this.setState({
                isLoading: false,
                validToken: false
            });
            return <Error404 />;
        }

        Axios
        .post(`${process.env.REACT_APP_API_URL}/verify-reset-token`, {
            token: params.get('token')
        })
        .then(res => {
            if(res.data){
                return this.setState({
                    isLoading: false,
                    validToken: true
                });
            }
        })
        .catch(err => {
            return this.setState({
                email: '',
                isLoading: false,
                validToken: false
            });
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true,
        });

        const params = new URLSearchParams(this.props.location.search);

        Axios
        .post(`${process.env.REACT_APP_API_URL}/reset-password`, {
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            token: params.get('token')
        })
        .then(res => {
            if(res.data){
                return this.setState({
                    isLoading: false,
                    resetSuccess: true
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
        if(this.state.isLoading){
            return (
                <div className='container-fluid bg-dark'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row align-items-center m-h-100'>
                                <div className='col-12 col-sm-8 col-md-8 col-lg-7 col-xl-5 mx-auto text-light text-center'>
                                    <div className='w-100 m-t-15'>
                                        <div className='spinner-border text-light m-b-20' role='status'>
                                            <span className='sr-only'>Loading...</span>
                                        </div>
                                        <h5>Please wait ...</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            if(this.state.validToken){
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
                                                <h3 className='text-center'>Change Password</h3>
                                                    {
                                                        this.state.resetSuccess ? 
                                                        <div className='row m-b-15'>
                                                            <div className='col-12'>
                                                                <div className='alert alert-success'>
                                                                    Password changed successfullly. <Link className='text-underline' to='/login'>Click here</Link> to login.
                                                                </div>
                                                            </div>
                                                        </div> : 
                                                        <form onSubmit={(e) => this.handleSubmit(e)}>
                                                            <div className='form-row m-b-15 m-t-20'>
                                                                <div className='form-group col-12 floating-label'>
                                                                    <label>New Password</label>
                                                                    <input
                                                                    type='password'
                                                                    className='form-control'
                                                                    placeholder='New Password'
                                                                    name='password'
                                                                    value={this.state.password}
                                                                    onChange={(e) => this.handleChange(e)}
                                                                    />
                                                                </div>
                                                                <div className='form-group col-12 floating-label'>
                                                                    <label>New Password Confirmation</label>
                                                                    <input
                                                                    type='password'
                                                                    className='form-control'
                                                                    placeholder='New Password Confirmation'
                                                                    name='password_confirmation'
                                                                    value={this.state.password_confirmation}
                                                                    onChange={(e) => this.handleChange(e)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='form-group'>
                                                            <button onSubmit={(e) => this.handleSubmit(e)} type='submit' className='btn text-uppercase btn-block  btn-primary'>
                                                                {
                                                                    this.state.isLoading ? <div className="spinner-border text-secondary" role="status"><span className="sr-only">Loading...</span></div> : 'Save'
                                                                }
                                                            </button>
                                                        </div>   
                                                        </form>
                                                    }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                );
            }else{
                return <Error404 />
            }
            
        }
    }
}

export default ResetPasswordPublic;