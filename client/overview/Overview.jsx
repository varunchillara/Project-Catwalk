import React from 'react';

class Overview extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			message: 'overview!!'
		};
	}
	render(){
		return(
			<div className="App">
				<p>{this.state.message}</p>
			</div>
		);
	}
}

export default Overview;