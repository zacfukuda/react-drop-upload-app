import React from 'react';

export default class UploadStatus extends React.Component {

	render() {
		let loaded = this.props.loaded;
		let zeros = '';

		if (loaded >= 0 && loaded < 10) zeros = '00';
		else if (loaded < 100) zeros = '0';

		let progress = zeros + loaded.toString();
		let progressBar = {width: loaded.toString() + '%'};
		//let progressBar = {width: '100%'};

		return(
			<table id="progressTable">
				<tbody>
					<tr>
						<th><b><span id="progress">{progress}</span>%</b></th>
						<td>
							<div className="progressBar">
								<div id="progressBar" style={progressBar}></div>
							</div>
							<button id="abortButton" onClick={this.props.onUploadAbort}><span></span></button>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}