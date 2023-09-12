import React from 'react';
import './display.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default function(){
	return (
		<div className="display grow">
			<ul id="output"></ul>
			<div id="add-entry-in"></div>
		</div>
	);
}
