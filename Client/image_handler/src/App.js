import React, { Component } from 'react';
import axios from 'axios';
import Recaptcha from 'react-google-invisible-recaptcha';
class App extends Component {

  state = {
    selectedImage: null,
    processedImg: null,
    urls : {
      host: "http://localhost:8000",
      post: 'http://localhost:8000/api/posts/'
    }
  };

 
  handleImageChange = (e) => {
    this.setState({
      selectedImage: e.target.files[0]
    })
  };

  sendMessage = () => {
    this.recaptcha.execute();
  } 


  onResolved = async (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.selectedImage);
    form_data.append('title', this.state.selectedImage.name);
    form_data.append('kindOfTool', 'toGrayScale');

    let url = this.state.urls.post;
    console.log(form_data)
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          this.setState({
            processedImg: this.state.urls.host + res.data
          });
          console.log(this.state.processedImg);
        })
        .catch(err => console.log(err))
  };

  render() {
    return (
      <React.Fragment>
        <div className="App">
        <form onSubmit={this.onResolved}>
          <p>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
         
          <input type="submit"/>
        </form>
      </div>
      <img src={this.state.processedImg} alt="" style={{maxWidth: "70%",
    maxHeight: "70%"}}/>

      {/* <Recaptcha
        ref={ ref => this.recaptcha = ref }
        sitekey="6LcufN8UAAAAAA6iGhPcLnfWZqdSWK3wtbbHtkX0"
        onResolved={ this.onResolved }
    /> */}

      </React.Fragment>
      
    );
  }
}

export default App;