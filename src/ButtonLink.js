import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

class ButtonLink extends Component{
    
    static propTypes = {
        children : PropTypes.node,
        to : PropTypes.string.isRequired,
        className : PropTypes.string
    }

    render(){
        //debugger; 

        const {children,to,className} = this.props;
        return (
            <button className={className}><Link to={to}>{children}</Link></button>
        );
    }
}

export default ButtonLink;