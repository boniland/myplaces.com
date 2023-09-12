import React from 'react';
import template from './display.jsx';
import {getTimeFormat, formatTime, getElapsedTime} from '../utils.js';
//import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers.js';

let entriesCounter = 0;
function getLiElement(working, time){
	const li = document.createElement('li');
	li.setAttribute('key', ++entriesCounter);
	const message = !working
		? `Entrada a las: ${time}`
		: `Salida a las: ${time}`;
	li.textContent = message;
	return li;
};

class Display extends React.Component{
	constructor(props){
		super(props);
		this.onNewEntry = props.onNewEntry;
		this.checkin = props.entries[props.entries.length-1]
			? props.entries[props.entries.length-1].split(': ')[1]
			: null;
	}		
	handleClick = ()=>{
		const time = getTimeFormat();		
		const li = getLiElement(this.props.working, time);
		this.output.appendChild(li);
		let checkout;
		if(!this.props.working){
			this.checkin = time;
			this.addEntryButton.className = 'checkout';
			this.addEntryButton.textContent = 'SALIDA';
		}else{			
			this.addEntryButton.className = 'checkin';
			this.addEntryButton.textContent = 'ENTRADA';
			checkout = formatTime(getElapsedTime(this.checkin, time));
		}
		this.onNewEntry(li.textContent, checkout);
  }
  buildList(entries){
  	entries.forEach(entry=>{
  		const li = document.createElement('li');
			li.setAttribute('key', ++entriesCounter);
			li.textContent = entry;
			this.output.appendChild(li);
  	});
  }
  componentDidUpdate(){
  }
	componentDidMount() {
		//await this.setState({'working': this.props.working});
		this.addEntryButton = document.getElementById('add-entry-in');
		//checkin red, out green
		this.addEntryButton.className = this.props.working ? 'checkout' : 'checkin';
		this.addEntryButton.textContent = this.props.working ? 'SALIDA' : 'ENTRADA';
    this.addEntryButton.addEventListener('click', this.handleClick);
    this.output = document.getElementById('output');
    this.buildList(this.props.entries);
  }
  componentWillUnmount() {
		this.addEntryButton.removeEventListener('click', this.handleClick);
  }
	render(){
		return template();
	}
};

export default Display;

