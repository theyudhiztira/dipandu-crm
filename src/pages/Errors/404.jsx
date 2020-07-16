import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Error404 extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <main className='bg-dark'>
                <div className='container'>
                    <div className='row m-h-100 '>
                        <div className='col-md-8 col-lg-4  m-auto'>
                            <div className='card shadow-lg p-t-20 p-b-20'>
                                <div className='card-body text-center'>
                                    <img width='200' alt='' src='assets/img/404.svg' />
                                    <h1 className='display-1 fw-600 font-secondary'>404</h1>
                                    <h5>Oops, the page you're
                                        looking for does not exist.</h5>
                                    <p className='opacity-75'>
                                        You may want to head back to the homepage.
                                        If you think something is broken, report a problem.
                                    </p>
                                    <div className='p-t-10'>
                                        <Link to='/' className='text-underline'>&lt; Go Back Home</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Error404;