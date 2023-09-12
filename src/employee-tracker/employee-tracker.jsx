import React from 'react';
import './employee-tracker.css';

import Header from '../header/header.js';
import Display from '../display/display.js';
import Footer from '../footer/footer.js';

// eslint-disable-next-line import/no-anonymous-default-export
export default function(checkout, working, handleNewEntry, entries){
	return (<div className="employee-tracker">
		<Header />
    <Display entries={entries} working={working} checkout={checkout} onNewEntry={handleNewEntry} />
    <Footer checkout={checkout} />
	</div>);
}

