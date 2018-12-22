import React from 'react';
import './weather-icons-master/css/weather-icons.css'

const OutputBox = props => {
	return (
		<div className="OutputBox">
			<strong>Weather</strong>
			<br/>
			<br/>
			<p>{props.locationName}</p>
			<p>{props.temp}</p>
			<p>{props.summary} <i id="icon" className="wi wi-day-sunny"></i></p>
			
		</div>
	);
}

export default OutputBox;