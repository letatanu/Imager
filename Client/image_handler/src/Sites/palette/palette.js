import React, { Component } from 'react';
import NavBar from '../modules/NavigationBar/NavBar';
import ImageQueue from '../modules/ImgQueue/ImgQueue';
import PaletteDiplays from '../modules/PaletteDisplay/PaletteDisplay';
import { Jumbotron } from "react-bootstrap";
import classes from './palette.module.css';
// import axios from 'axios';
import GetPostHandlers from '../modules/GetAndPost/GetPostHandler';
class Palette extends Component {
    state = {
        selectedImages: [],
        processedImg: [],
       
    };

    handleImageChange = (e) => {
        let selectedImage = e.target.files[0];
        let l = this.state.selectedImages.length;
        console.log(selectedImage);
        if (l + 1 <= 20) {
            this.setState( (prevState) => ({
                selectedImages: [...prevState.selectedImages, 
                    {id: l, 
                    image: selectedImage,
                    url: URL.createObjectURL(selectedImage)
            }]                                               
            }));
        }
    };

    clickOnImage = (id) => {
        console.log(id);
        const [host, res] = GetPostHandlers(this.state.selectedImages[id].image, "toGray");
        console.log(host, res);
    }
    // onClickedImage = async (index) => {
    //     console.log(index);
    //     let form_data = new FormData();
    //     form_data.append('image', this.state.selectedImages[index]);

    //     let url = this.state.urls.post;
    //     console.log(form_data)
    //     axios.post(url, form_data, {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     })
    //         .then(res => {
    //             this.setState({
    //                 processedImg: this.state.urls.host + res.data
    //             });
    //             console.log(this.state.processedImg);
    //         })
    //         .catch(err => console.log(err))
    // };

    render() {
        const q = [
            { id: 1, value: '1' },
            { id: 2, value: '2' },
            { id: 3, value: '3' },
            { id: 4, value: '4' },
        ];

        const colors = [
            { id: 1, value: "red" },
            { id: 2, value: "yellow" }
        ];
        return (<div>
            <NavBar></NavBar>
            <Jumbotron fluid className={classes.jumbotron}>
                <h1>
                    Palette
                </h1>
                <p>
                    The place to get colors from your images
                </p>
                <p> You can upload up to 20 images</p>
            </Jumbotron>
            <ImageQueue Queue={this.state.selectedImages} onClick={this.clickOnImage}></ImageQueue>
            <div >

            </div>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
            <button>Drop image here or Click on to Upload </button>
            <img src={this.state.processedImg}></img>
            {/* <PaletteDiplays colors={colors}></PaletteDiplays> */}
        </div>
        )
    }
};


export default Palette;