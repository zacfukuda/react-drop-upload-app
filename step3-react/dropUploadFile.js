(function () {
	'use strict';

	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob)
		console.log('OK');
	else
		alert('The File APIs are not fully supported in this browser.');

	var reader, files, xhr;
	var dropZone = document.getElementById('dropZone'),
			progress = document.getElementById('progress'),
			progressBar = document.getElementById('progressBar'),
			outputTag = document.getElementById('output');

	/**
	 * Event handlers for ReadFile.
	 */

	// Stop reading files (Unnecessary in this file.)
	function abortRead() {
		reader.abort();
	}

	// FileReader abort Handler
	function abortHandler(evt) {
		alert('File read Canceled');
	}

	// FileReader Error Handler
	function errorHandler (evt) {
		switch(evt.target.error.code) {
			case evt.target.error.NOT_FOUND_ERR:
				alert('File Not Found!');
				break;
			case evt.target.error.NOT_READABLE_ERR:
				alert('File is not readable');
				break;
			case evt.target.error.ABORT_ERR:
				break; // noop
			default:
				alert('An error occurred reading this file.');
		}
	}

	// Event after loading a file completed (Append thumbnail.)
	function loadHandler(theFile) {
		progress.textContent = '100';
		progressBar.style.width = '100%';

		return function(e) {
			var newFile = document.createElement('div');
			var picture = document.createElement('picture');
			var img = document.createElement('div');
			img.style.backgroundImage = 'url(' + e.target.result + ')';
			img.title = escape(theFile.name);
			img.className = 'thumb';

			picture.appendChild(img);
			newFile.appendChild(picture);
			newFile.className = 'file';

			outputTag.insertBefore(newFile, null);
		}
	}

	// Main function for ReadFile and appending thumbnails.
	function appendThumbnail(index) {
		var f = files[index];
		reader = new FileReader();
		reader.onabort = abortHandler;
		reader.onerror = errorHandler;
		reader.onload = loadHandler(f);
		reader.readAsDataURL(f);
	}

	/**
	 * Event handlers for the Ajax uploading.
	 */
	
	// Display the progress of an ajax uploading.
	function progressHandler(evt) {
		if (evt.lengthComputable) {
			var loaded = Math.round((evt.loaded / evt.total) * 100);
			var zeros = '';
			
			// Percent Loaded in string
			if (loaded > 0 && loaded < 10) zeros = '00';
			else if (loaded < 100) zeros = '0';

			// Display progreess in 3-digit and increase the bar length.
			progress.textContent = zeros + loaded.toString();
			progressBar.style.width = loaded + '%';
		}
	}

	// Handle the ajax responce from the server.
	function ajaxHandler() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.response);
			console.log(response.filename + 'uploaded');
			appendThumbnail(response.index);
		} else {
			// Uncomment if you want to display other than the status above.
			// console.log('State: '+this.readyState+', '+this.statusText); 
		}
	}

	// Abort an ajax event (stop uploading files.)
	// Trigger by "button" element in index.html.
	function abortUpload(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		xhr.abort();
	}

	/**
	 * Main Event Handler to deal with the whole drop & upload processes.
	 */
	function handleFileSelect(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		dropZone.classList.remove('dragover');
		progress.textContent = '000';
		progressBar.style.width = '0%';
		
		files = evt.dataTransfer.files; // FileList object.
		
		// Go through each file.
		for (var i=0, f; f=files[i]; i++) {

			// Only process image files.
			if ( !f.type.match('image.*') ) continue;
			
			// Create form data containing a file to be uploaded.
			var formData = new FormData();
			formData.append("index", i);
			formData.append("image", f);

			// Ajax event: Upload files to the server.
			xhr = new XMLHttpRequest();
			xhr.onreadystatechange = ajaxHandler;
			xhr.onprogress = progressHandler;
			xhr.open('POST', '/upload', true);
			xhr.send(formData);

		} // END for

	} // END handleFileSelect

	/**
	 * functions assosiating drag envet.
	 */
	function handleDragEnter (e) {
		e.stopPropagation();
		e.preventDefault();
		this.classList.add('dragover');
	}
	function handleDragLeave (e) {
		e.stopPropagation();
		e.preventDefault();
		this.classList.remove('dragover');
	}
	function handleDragOver (e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	}

	/**
	 * Setup the evnet listeners.
	 */
	dropZone.addEventListener('dragenter', handleDragEnter, false)
	dropZone.addEventListener('dragleave', handleDragLeave, false)
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);
})();