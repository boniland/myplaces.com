import React from 'react';
import template from './employee-tracker.jsx';
import {storage, getDate, updateTime} from '../utils.js';

function getEmployeeData(){
	//TODO: al entrar si se cambia de dia, etc...y se nos olvido hacer la salida, que sucede?

	//storage.clear();
	const currentDate = getDate().split(' ');
	const year = currentDate[3];
	const month = currentDate[2];
	const dayName = currentDate[0].toLowerCase();
	const dayNumber = currentDate[1];
	const day = `${dayName}(${dayNumber})`;
	let employeeData = storage.getItem('checkin-app');
	if(!employeeData){
		storage.setItem('checkin-app', {
			working: false,
      elapsedTime: '00:00:00',//TODO: esto hay que resetearlo cuando se cambia de dia/mes/año
      entries: {
        [year]: {
          [month]: {
            [day]: []
          }
        }
      }
    });
		employeeData = storage.getItem('checkin-app');
  }else{
		if (!employeeData.entries.hasOwnProperty(year)){
			employeeData.elapsedTime = '00:00:00';
      employeeData.working = false;
      employeeData.entries[year] = {
        [month]: {
          [day]: []
        }
      };
    }
    if(!employeeData.entries[year].hasOwnProperty(month)){
			employeeData.elapsedTime = '00:00:00';
      employeeData.working = false;
      employeeData.entries[year][month] = {
        [day]: []
      };
    }
    if(!employeeData.entries[year][month].hasOwnProperty(day)){
			employeeData.elapsedTime = '00:00:00';
      employeeData.working = false;
      employeeData.entries[year][month][day] = [];
    }
  }
	const elapsedTime = employeeData.elapsedTime;
	const working = employeeData.working;
  return {elapsedTime, working, year, month, day, ...employeeData.entries};
}
class EmployeeTracker extends React.Component{
	constructor(){
		super();
		const {elapsedTime, working, year, month, day, ...entries} = getEmployeeData();
		this.state = {elapsedTime: elapsedTime, working: working};
		this.year = year;
		this.month = month;
		this.day = day;
		this.entries = entries;
	}
	async handleNewEntry(entry, checkout){
		this.entries[this.year][this.month][this.day].push(entry);
		const stateElapsedTime = checkout	? await this.setState({elapsedTime: updateTime(this.state.elapsedTime, checkout)}) : null;
		const stateWorking = await this.setState({working: !this.state.working});
		storage.setItem('checkin-app', {
			elapsedTime: this.state.elapsedTime,
			working: this.state.working,
			entries: this.entries
		});
	}
	render(){
		return template(this.state.elapsedTime, this.state.working, this.handleNewEntry.bind(this), this.entries[this.year][this.month][this.day]);
	}
};

export default EmployeeTracker;
