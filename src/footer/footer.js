import React from 'react';
import template from './footer.jsx';

class Footer extends React.Component{
	render(){
		return template(this.props.checkout);
	}
};

export default Footer;
