import React, { Component } from 'react'
import {ReactComponent as ComingSoonSVG} from '../../../resources/illustrations/comingSoon.svg'
import {Typography} from "@material-ui/core";
import './ComingSoon.css';

export default class ComingSoon extends Component {
    render() {
        return (
            <div className='comingSoonDiv'>
                <Typography variant='h2' className='comingSoonTitle'>
                    Coming soon...
                </Typography>
                <ComingSoonSVG width={'50%'} height={'40%'} className='comingSoonSVG'/>
            </div>
        )
    }
}
