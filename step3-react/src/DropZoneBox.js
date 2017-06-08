import React from 'react';
import axios from 'axios';
import UploadStatus from './UploadStatus';

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

export default class DropZoneBox extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			dragover: ''
		}
		this.abortUpload = this.abortUpload.bind(this);
		this.handleFileSelect = this.handleFileSelect.bind(this);
		this.handleDragEnter = this.handleDragEnter.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
	}

	abortUpload(e) {
		e.stopPropagation();
		e.preventDefault();
		source.cancel();
		this.setState({progress: 0});
		console.log('Uploading aborted.');
	}

	handleFileSelect(e) {
		e.stopPropagation();
		e.preventDefault();
		this.setState({dragover: ''});
		this.setState({progress: 0});

		let files = e.dataTransfer.files;

		for (let i=0, f; f=files[i]; i++) {
			if ( !f.type.match('image.*') ) continue;

			let formData = new FormData();
			formData.append("index", i);
			formData.append("image", f);

			axios.post(this.props.url, formData, {
				onUploadProgress: (e) => {
					if (e.lengthComputable) {
						let loaded = Math.round((e.loaded / e.total) * 100);
						this.setState({progress: loaded});
					}
				},
				cancelToken: source.token
			}).then(response => {
				let data = response.data;
				let readingFile = files[data.index];
				console.log(data.filename + ' uploaded');

				let reader = new FileReader();
				reader.onload = () => {
					let newFile = {
						name: readingFile.name,
						url: reader.result
					};
					this.props.onUploaded(newFile);
				}
				reader.readAsDataURL(readingFile);

			}).catch(err => {
				console.log(err);
			});

		}
	}

	handleDragEnter(e) {
		e.stopPropagation();
		e.preventDefault();
		this.setState({dragover: 'dragover'});
	}

	handleDragLeave(e) {
		e.stopPropagation();
		e.preventDefault();
		this.setState({dragover: ''});
	}

	handleDragOver(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}

	render() {
		return(
			<div id="dropZoneBox">
				<div
					id="dropZone"
					className={this.state.dragover}
					onDragEnter={this.handleDragEnter}
					onDragLeave={this.handleDragLeave}
					onDragOver={this.handleDragOver}
					onDrop={this.handleFileSelect}>
					Drop files here to upload
				</div>
				<h6>Upload Status</h6>
				<UploadStatus loaded={this.state.progress} onUploadAbort={this.abortUpload} />
			</div>
		);
	}
}