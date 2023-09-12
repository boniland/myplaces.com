import React from 'react';
import './footer.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default function(time){
	return (
	<div className="footer column">
		<div className="grow">Hoy | <span id="time-worked">{time}</span></div>
	</div>
	);
}
