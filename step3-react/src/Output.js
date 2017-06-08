import React from 'react';
import Thumbnail from './Thumbnail';

export default class Output extends React.Component {

	/* constructor(props) {
		super(props);
	} */

	render() {
		let thumbnailNodes = this.props.files.map(file => {
			return(
				<Thumbnail title={file.name} url={file.url} key={file._id} />
			);
		});
		return(
			<output id="output">{thumbnailNodes}</output>
		);
	}
}