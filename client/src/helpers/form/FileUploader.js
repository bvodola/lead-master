import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from 'material-ui/CircularProgress';

// UploadedFiles
// Renders the array of uploaded files

class UploadedFiles extends Component {

	constructor(props) {
		super(props);

		this.style = {
			removeImageIcon: {
				"fontSize":"35px",
				"color":"rgb(183, 28, 28)",
				"position":"absolute",
				"right":"5px","opacity":"0.7",
				"background":"rgba(255,255,255,0.8)",
				"top":"3px",
				"borderRadius":"100px",
				"lineHeight":"30px",
				"padding":"0 5px",
				"cursor":"pointer"
			},

			image: {
				maxWidth: '250px',
				maxHeight: '150px'
			},

			imageDiv: {
				"display": "inline-block",
				"borderRadius": "5px",
				"position": "relative",
				"margin": "10px 0"
			}
		}
	}

	removeImage(id){
		this.props.removeImage(id);
	}

	render() {

		return(
			<div>
				{this.props.files.map((image, index) => {
					let isFileLoading = !image.url;

					return(
					<div style={this.style.imageDiv} key={Math.random().toString(36).substr(2)}>
						{
							isFileLoading ?
							<CircularProgress
								style={{position: 'absolute', width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }}
								innerStyle={{position: 'absolute', width: '40px', height: '40px', top: '30%', left: '30%'}}
							/>:
							(<span onClick={() => this.removeImage(image.id)} style={this.style.removeImageIcon}>&times;</span>)

						}

						<img alt="" style={this.style.image} src={image.src} />
					</div>
				)
			}
			)}
			</div>
		);
	}

}

class FileUploader extends Component {

	// ===========
	// constructor
	// ===========
	constructor(props) {
		super(props);

		// Inline Style
		this.inlineStyle = {
			div: {
				width: '100%'
			},

			input: {
				width: 0.1,
				height: 0.1,
				opacity: 0,
				overflow: 'hidden',
				position: 'absolute',
				zIndex: -1
			},

			uploadIcon: {
				width: 30,
				fontSize: 20,
				lineHeight: '8px'
			},

			label: {
				fontSize: 15,
				// pointerEvents: 'none',
				display: 'inline-block',
				cursor: 'pointer'
			}
		}

		// Initial State
		this.state = {
			uploadedFiles: props.defaultValue || [],
			maxFilesReached: false,
			loader: false,
			data: {
				body: new FormData(),
				length: 0,
			},
			images: []
		}
		this.inputName = Math.random().toString(36).substring(7);
	}

	handleChange(event) {

		event.preventDefault();

		// Checks if the maximum number of files was reached (if there's a maximum)
		if(typeof this.props.maxFiles === 'undefined' || this.state.uploadedFiles.length < this.props.maxFiles) {

			// Checks if a file was selected
			let files = ReactDOM.findDOMNode(event.target).files;

			if(files) {

				let { data, images } = this.state;

				for(let i=0; i < files.length; i++) {

					let file = files[i];
					let reader = new FileReader();

					// Setting the image object
					let image = {
						id: Math.random().toString(36).substring(7),
						src: false,
						data: false,
						url: false
					}

					// Setting data and preview src
					reader.readAsDataURL(file);
					reader.onload = (ev) => {
						image.src = ev.target.result;
						let imageData = new FormData();
						imageData.append('file', file);
						image.data = imageData;
						images = this.state.images;
						images.push(image);
						this.setState({images});
						this.uploadFile(image);
					}


				}


			}
		}
	}



	componentWillReceiveProps(nextProps) {
		if(!this.props.uploadCachedFiles && nextProps.uploadCachedFiles) {
			// this.uploadFiles();
		}
	}

	uploadFile(file){
			fetch('https://crodity-fileserver.mybluemix.net/upload/', {
				method: 'POST',
				mode: 'cors',
				body: file.data
			}).then((response) => {
				return response.json();
			}).then((data) => {
				
				let uploadedFiles = this.state.uploadedFiles.concat(data);

				let { images } = this.state;
				images = images.map((v,i) => {
					if(v.id === file.id) {
						v.url = data[0];
						v.data = false;
					}
					return v;
				});

				this.setState({
					uploadedFiles,
					images
				});

				let { stateHandler, name } = this.props;
				if(stateHandler && name) {
					stateHandler.set(name, uploadedFiles)
				}

			}).catch((reason) => {
				console.log('Error Uploading File');
				console.error(reason);
			});

	}
	// ===========
	// removeImage
	// ===========

	removeImage(imageId) {
		let { uploadedFiles, images } = this.state;
		let image;

		images = images.filter((v) => {
			if(v.id === imageId) {
				image = v;
				return false;
			} else {
				return true;
			}
		});

		for(let i=0; i<uploadedFiles.length; i++) {
			if(image.url === uploadedFiles[i]) {
				uploadedFiles.splice(i, 1);
				break;
			}
		}

		this.setState({uploadedFiles, images});

		fetch(image.url, {
			method: 'DELETE',
			mode: 'cors'
		}).then((response) => {
			console.log(response);
		}).catch((reason) => {
			console.error(reason);
		});
	}


	render() {
		let disabled = typeof this.props.maxFiles !== 'undefined' && this.state.uploadedFiles.length >= this.props.maxFiles;
		let addFileElement = typeof this.props.addFileElement !== 'undefined' ? this.props.addFileElement: 'Adicionar arquivo';
		let { images } = this.state;

		return(
			<div style={this.inlineStyle.div}>
				<input
					disabled={disabled}
					style={this.inlineStyle.input}
					id={this.inputName}
					type="file"
					onChange={(ev) => this.handleChange(ev)}
					multiple
				/>
				<label disabled={disabled} htmlFor={this.inputName} style={this.inlineStyle.label}>
					{addFileElement}
				</label>
				<UploadedFiles files={images} removeImage={this.removeImage.bind(this)} />
			</div>
		)
	}

}

export default FileUploader;
