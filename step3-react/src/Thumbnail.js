import React from 'react';

export default class Thumbnail extends React.Component {
	
	/*constructor(props) {
		super(props);
	}*/

	render() {
		let divStyle = {
			backgroundImage: 'url(' + this.props.url + ')'
		};

		return(
			<div className="file">
				<picture>
					<div className="thumb" title={this.props.name} style={divStyle}></div>
				</picture>
			</div>
		);
	}
} 