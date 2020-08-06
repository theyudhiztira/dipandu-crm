import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <aside className='admin-sidebar'>
                <div className='admin-sidebar-brand'>
                    <img className='admin-brand-logo' src='assets/img/logo.svg' width='40' alt='atmos Logo' />
                    <span className='admin-brand-content'><Link to='/'>DiPandu</Link></span>
                    <div className='ml-auto'>
                        <Link to='/' className='admin-pin-sidebar btn-ghost btn btn-rounded-circle' />
                        <Link to='/' className='admin-close-sidebar' />
                    </div>
                </div>
                <Menu />
            </aside>
        );
    }
}

export default Sidebar;