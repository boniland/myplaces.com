import React from 'react';
import './header.css';
import {getDate} from '../utils.js';

export default function Header(){
	return <div className="header">{getDate()}</div>;
};