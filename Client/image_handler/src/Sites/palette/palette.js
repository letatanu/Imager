import React, { Component } from 'react';
import NavBar from '../modules/NavigationBar/NavBar';
import ImageQueue from '../modules/ImgQueue/ImgQueue';
import PaletteDiplays from '../modules/PaletteDisplay/PaletteDisplay';
import { Jumbotron } from "react-bootstrap";
import classes from './palette.module.css';
import axios from 'axios';
import { CircularProgress, Slider, withStyles, Grid, Button } from "@material-ui/core";
// import {FiUpload} from 'react-icons/fi';
const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

class Palette extends Component {
    state = {
        selectedImages: [],
        currentResult: [],
        numberOfColors: 4,
        selectedID: -1,
        loading: false
    };

    handleImageChange = (e) => {
        let selectedImage = e.target.files[0];
        let l = this.state.selectedImages.length;
        // console.log(selectedImage);
        if (l + 1 <= 20) {
            this.setState((prevState) => ({
                selectedImages: [...prevState.selectedImages,
                {
                    id: l,
                    image: selectedImage,
                    url: URL.createObjectURL(selectedImage),
                    palette: [],
                    isProcessed: false
                }],
                selectedID: l
            }));
            this.GetPostHandlers(selectedImage, "palette", l);
        }
    };

    clickOnImage = (id) => {
        // console.log(id);
        this.setState({
            selectedID: id,
            loading: true
        })
        if (this.state.selectedImages[id].palette && this.state.selectedImages[id].palette.length && this.state.selectedImages[id].isProcessed) {
            this.setState({
                currentResult: this.state.selectedImages[id].palette,
                loading: false
            })
        } else {
            this.GetPostHandlers(this.state.selectedImages[id].image, "palette", id);
        }

    }

    GetPostHandlers = async (image, task, id) => {
        this.setState({
            loading: true
        })
        console.log("number of colors", this.state.numberOfColors);
        const urls = {
            host: "http://localhost:8000",
            post: 'http://localhost:8000/api/posts/'
        }
        let data = null;
        let form_data = new FormData();
        form_data.append('image', image);
        form_data.append('task', task);
        form_data.append('numberOfColors', this.state.numberOfColors);
        form_data.append("image_id", id);
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
                    procImage[index].isProcessed = false;
                    this.setState({
                        selectedImages: [...procImage]
                    });
                }

                console.log(res.data);
                const res_numOfColor = res.data.numberOfColor;
                if (res_numOfColor === this.state.numberOfColors) {
                    const palette = res.data.palette;
                    console.log(palette);
                    this.setState({
                        currentResult: palette,
                        loading: false
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })

    };
    sliderChanged = (event, newValue) => {
        console.log(newValue);
        this.setState({
            numberOfColors: newValue
        })

        let selectedImgs = [...this.state.selectedImages];
        if (selectedImgs.length === 0) {
            return;
        }
        this.setState({
            loading: true
        })
        selectedImgs.forEach((image) => {
            image.isProcessed = false
        })

        this.setState({
            selectedImages: [...selectedImgs],
        })

        const selectedID = this.state.selectedID;
        this.clickOnImage(selectedID);
    }

    render() {
        const colors = [...this.state.currentResult];
        const results = colors.splice(0, this.state.numberOfColors);
        const resultImg = this.state.loading ? <CircularProgress color="secondary" /> :
            <PaletteDiplays colors={results}></PaletteDiplays>;

        // console.log("id", this.state.selectedID);
        const selectedImg = this.state.selectedID >= 0 ? (
            <img src={this.state.selectedImages[this.state.selectedID].url} alt="" style={{ width: "100%",
                height: "auto"}}/>) : null;
        return (<div className={classes.container}>
            <NavBar></NavBar>
            <Jumbotron fluid className={classes.jumbotron}>
                <h1 className={classes.title}>
                    Palette
                </h1>
                <p className={classes.subTitle}>
                    The place to get colors from your images
                 </p>
                <p> You can upload up to 20 images</p>
            </Jumbotron>
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item className={classes.choosingImage} xs={12}>
                        <PrettoSlider
                            step={1}
                            valueLabelDisplay="on"
                            min={2}
                            max={9}
                            aria-label="pretto slider"
                            onChange={(event, newValue) => {this.setState({numberOfColors: newValue})}}
                            onChangeCommitted={this.sliderChanged} defaultValue={4}
                            style={{ width: "30%" }} />
                        <div style={{ margin: "1em" }}>The number of dominant colors: {this.state.numberOfColors}</div>
                        <div>
                        <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                onChange={this.handleImageChange} required
                                type="file"
                                style={{display: 'none'}}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Select an image
                                </Button>
                            </label>
                        </div>
    
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <ImageQueue Queue={this.state.selectedImages} onClick={this.clickOnImage} selectedID={this.state.selectedID == -1 ? 0 : this.state.selectedID} />
                    </Grid>
                    <Grid item xs={4} />

                    <Grid item xs={1} />
                    <Grid item xs={5} className={classes.retunedImg}>
                        {selectedImg}
                    </Grid>

                    <Grid item xs={1} />
                    <Grid item xs={3} >  {resultImg}</Grid>
                    <Grid item xs={1} />

                </Grid>
            </div>
        </div>
        )
    }
};


export default Palette;