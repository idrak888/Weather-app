import React from 'react';
import '../App.css';

const InputBox = props => {
	return (
		<div className="InputBox">
			<strong>Enter Location</strong><br/>
			<input type="text" className="input" placeholder="Los Angeles, USA" />
			<button className="btn btn-block btn-primary" onClick={props.sendReq}>Enter</button>
		</div>
	);
}

export default InputBox;