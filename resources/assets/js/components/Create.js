import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

export default class Create extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            image: '',
            sucess: false,
            error: false,
            description: '',
            imagePreviewUrl: false
        }
    }
    
    handleImageChange(e) {
        this.setState({name: e.target.value})
    }

    handleDescriptionChange(e) {
        this.setState({description: e.target.value})
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value})
    }

    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        
        if (!files.length)
            return;
        
        this.createImage(files[0]);
    }
    
    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                image: e.target.result,
                name: file.name
            })
        };
        reader.readAsDataURL(file);
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state)

        if(this.state.image)
            Axios.post('/api/images', this.state)
                .then(response => {
                    if(response.data.status === 'success')
                        alert("Cool. Image is uploaded.")
                })
                .catch(err => {
                    console.log(err)
                })
        else
            alert("Please select an image.")
    }

    render() {
        return (
            <React.Fragment>
                <h2>Add New Image</h2>
                <form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="name">Upload picture:</label>
                        <div className="col-sm-10">
                            <input className="form-control" id="file" type="file" name="file" onChange={this.onChange.bind(this)} />
                            
                            <div className="imgPreview">
                            { this.state.imagePreviewUrl ?  (<img className="add_imagem" Name="add_imagem" src={this.state.imagePreviewUrl} />) : ( 'Upload image' )
                            }
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="email">Add description:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="description" placeholder="Enter description" name="description" value={this.state.description} 
                            onChange={this.handleDescriptionChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Save</button>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

if (document.getElementById('create')) {
    ReactDOM.render(<Create />, document.getElementById('create'));
}