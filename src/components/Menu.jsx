import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeMenu: '0'
        }
    }
    render() { 
        return (
            <ul className='menu'>
                <li className='menu-item'>
                    <Link to='/' className='menu-link'>
                        <span className='menu-label'>
                            <span className='menu-name'>
                                Dashboard
                            </span>
                        </span>
                        <span className='menu-icon'>
                            <span className='icon-badge badge-success badge badge-pill'>1</span>
                            <i className='icon-placeholder mdi mdi-link-variant '></i>
                        </span>
                    </Link>
                </li>
            </ul>
        );
    }
}

export default Menu;