import React, { Component } from 'react';
import NavBar from '../modules/NavigationBar/NavBar';
import ImageQueue from '../modules/ImgQueue/ImgQueue';
import PaletteDiplays from '../modules/PaletteDisplay/PaletteDisplay';
import { Jumbotron } from "react-bootstrap";
import classes from './palette.module.css';
import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const marks = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9
}

class Palette extends Component {
    state = {
        selectedImages: [],
        currentResult: [],
        numberOfColors: 4,
        selectedID: -1,
    };

    handleImageChange = (e) => {
        let selectedImage = e.target.files[0];
        let l = this.state.selectedImages.length;
        console.log(selectedImage);
        if (l + 1 <= 20) {
            this.setState((prevState) => ({
                selectedImages: [...prevState.selectedImages,
                {
                    id: l,
                    image: selectedImage,
                    url: URL.createObjectURL(selectedImage),
                    palette: [],
                    isSliderChanged: false
                }]
            }));
            this.GetPostHandlers(selectedImage, "palette", l);
        }

    };

    clickOnImage = (id) => {
        // console.log(id);
        this.setState({
            selectedID: id
        })
        if (this.state.selectedImages[id].palette && this.state.selectedImages[id].palette.length && !this.state.selectedImages[id].isSliderChanged) {
            this.setState({
                currentResult: this.state.selectedImages[id].palette
            })
        } else {
            this.GetPostHandlers(this.state.selectedImages[id].image, "palette", id);
        }

    }

    GetPostHandlers = async (image, task, id) => {
        const urls = {
            host: "http://localhost:8000",
            post: 'http://localhost:8000/api/posts/'
        }
        let data = null;
        let form_data = new FormData();
        form_data.append('image', image);
        form_data.append('task', task);
        form_data.append('numberOfColors', this.state.numberOfColors);
        let url = urls.post;
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                data = res.data
                let procImage = [...this.state.selectedImages];
                const index = procImage.findIndex(x => x.id === id);
                if (index !== -1) {
                    procImage[index].palette = data;
                    procImage[index].isSliderChanged = false;
                    this.setState({
                        selectedImages: [...procImage]
                    });
                }

                console.log(res.data);
                this.setState({
                    currentResult: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

    };
    sliderChanged = (value) => {
        console.log(value);
        let selectedImgs = [...this.state.selectedImages];
        selectedImgs.forEach((image) => {
            image.isSliderChanged = true
        })
        console.log(selectedImgs);
        this.setState({
            selectedImages: [...selectedImgs],
            numberOfColors: value,
            currentResult: [], 
            selectedID: -1
        })
        // const id = this.state.selectedID;
        // if (id >= 0) {
        //     if (this.state.selectedImages[id].palette && this.state.selectedImages[id].palette.length && !this.state.selectedImages[id].isSliderChanged) {
        //         this.setState({
        //             currentResult: this.state.selectedImages[id].palette
        //         })
        //     } else {
        //         this.GetPostHandlers(this.state.selectedImages[id].image, "palette", id);
        //     }
        // }
    }

    render() {
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
                accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
            <button>Drop image here or Click on to Upload </button>

            <Slider min={0} max={9} onChange={(value) => this.sliderChanged(value)} defaultValue={4} dots marks={marks} />
            <PaletteDiplays colors={this.state.currentResult}></PaletteDiplays>
        </div>
        )
    }
};


export default Palette;