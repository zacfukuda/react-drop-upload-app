import React from 'react';
import DropZoneBox from './DropZoneBox';
import Output from './Output';

export default class DropUploadFile extends React.Component {

	constructor(props) {
		super(props);
		this.state = { files: [] };
		this.appendThumbnail = this.appendThumbnail.bind(this);
	}

	appendThumbnail(f) {
		f._id = Date.now();

		let files = this.state.files;
		let newFiles = files.concat([f]);
		this.setState({files: newFiles});
	}

	render() {
		return (
			<div className="wrapper">
				<h1>Drop &amp; Upload Files</h1>
				<DropZoneBox url={this.props.url} onUploaded={this.appendThumbnail} />
				<Output files={this.state.files} />
			</div>
		);
	}
}