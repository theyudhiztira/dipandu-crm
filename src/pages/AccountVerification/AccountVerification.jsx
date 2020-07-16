import React, { Component } from "react";
import './AccountVerification.css';
import Axios from "axios";
import Error404 from "../Errors/404";
import { Link } from "react-router-dom";

class AccountVerification extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            validToken: false
        }
    }

    componentWillMount()
    {
        const params = new URLSearchParams(this.props.location.search);

        if(!params.get('token')){
            this.setState({
                isLoading: false,
                validToken: false
            })
            return <Error404 />;
        }

        Axios
        .post(`${process.env.REACT_APP_API_URL}/verify-email`, {
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
        .catch(() => {
            return this.setState({
                isLoading: false,
                validToken: false
            });
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
                                        <div class='spinner-border text-light m-b-20' role='status'>
                                            <span class='sr-only'>Loading...</span>
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
                return (<div className='container-fluid bg-dark'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row align-items-center m-h-100'>
                                <div className='col-12 col-sm-8 col-md-8 col-lg-7 col-xl-5 mx-auto text-light text-center'>
                                    <img className='w-25' src='assets/img/verified-account.svg' alt='' />
                                    <div className='w-100 m-t-15'>
                                        <h5>Nice! Your account has been verified. You can start to use our service now. </h5>
                                        <h5 className='m-t-15'><Link to='/login' className='text-underline'>Click here to login</Link></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>);
            }else{
                return <Error404 />
            }
        }
    }
}

export default AccountVerification;