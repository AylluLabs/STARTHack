import React, { Component } from 'react';
import UserCard from './UserCard/UserCard';

export default class Office extends Component {
    render() {
        return (
            <div className='mainOffice'>
               <UserCard/> 
            </div>
        )
    }
}
