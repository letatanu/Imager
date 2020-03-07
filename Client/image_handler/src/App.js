import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    selectedImage: null,
    processedImg: null,
  };


  handleImageChange = (e) => {
    this.setState({
      selectedImage: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.selectedImage, this.state.selectedImage.name);
    let url = 'http://localhost:8000/api/posts/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          
          this.setState({
            processedImg: 'http://localhost:8000' + res.data
          });
          console.log(this.state.processedImg);
        })
        .catch(err => console.log(err))
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <p>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
          <input type="submit"/>
        </form>
        <img src={this.state.processedImg} alt="sdf" style={{maxWidth: "70%",
    maxHeight: "70%"}}/>
      </div>
    );
  }
}

export default App;