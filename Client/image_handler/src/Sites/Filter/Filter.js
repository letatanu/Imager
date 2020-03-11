import React, { Component } from 'react';
import NavBar from '../modules/NavigationBar/NavBar';
import ImageQueue from '../modules/ImgQueue/ImgQueue';
import { Jumbotron, ListGroup } from "react-bootstrap";
import classes from './Filter.module.css';
import axios from 'axios';
import { Card, CardImg, CardTitle } from 'reactstrap';

import 'rc-slider/assets/index.css';

const tasks = ["toGray", "Gaussian", "Detail"]

class Filter extends Component {
    state = {
        selectedImages: [],
        processedImg: [],
        currentResult: 0,
        task: 'toGray',
        imageClicked: -1,
        filterSelected: 0,
        loading: false
    };

    handleImageChange = (e) => {
        let selectedImage = e.target.files[0];
        let l = this.state.selectedImages.length;
        // console.log(l, selectedImage);
        if (l + 1 <= 20) {
            this.setState((prevState) => ({
                selectedImages: [...prevState.selectedImages,
                {
                    id: l,
                    image: selectedImage,
                    url: URL.createObjectURL(selectedImage)
                }],
                imageClicked: l,
            }));
            this.GetPostHandlers(selectedImage, tasks[this.state.filterSelected], l);
        }
    };

    clickOnImage = (id) => {
        // console.log(id);
        this.setState({
            imageClicked: id
        })
        this.GetPostHandlers(this.state.selectedImages[id].image, this.state.task, id);
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
        let url = urls.post;
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            },
            onDownloadProgress: (progressEvent) => {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log("download", percentCompleted);
                // this.setState({
                //     loading: percentCompleted
                // })
            },
            onUpLoadProgress: (progressEvent) => {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log("upload",percentCompleted);
                this.setState({
                    loading: true
                })
            },
        })
            .then(res => {
                data = res.data
                // console.log(Math.ceil(res.data.count / res.data.results.length))
                let procImage = [...this.state.processedImg];
                const index = procImage.findIndex(x => x.id === id);
                if (index !== -1) {
                    procImage[index].image = data;
                    this.setState({
                        processedImg: [...procImage]
                    });
                } else {
                    this.setState((prevState) => ({
                        processedImg: [...procImage, {
                            id: id,
                            image: data
                        }]
                    }));
                }
                console.log(res.data);
                this.setState({
                    currentResult: urls.host + res.data,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err)
            })

    };
    filterSelected = (id) => {
        // console.log(id);
        this.setState({
            task: tasks[id],
            filterSelected: id
        })
        if (this.state.imageClicked !== -1) {
            this.GetPostHandlers(this.state.selectedImages[this.state.imageClicked].image, tasks[id], this.state.imageClicked);
        }
    }
    render() {
        const result = this.state.selectedImages.length !== 0 ? (
            <div className={classes.displayResult}>
                <Card className={classes.retunedImg}>
                    <CardImg src={this.state.selectedImages[this.state.imageClicked].url} alt="Before" ></CardImg>
                    <CardTitle disabled> Before </CardTitle>
                </Card>
                <Card className={classes.retunedImg}>
                    <CardImg src={this.state.currentResult} alt="After"></CardImg>
                    <CardTitle disabled> After </CardTitle>
                </Card>
            </div>
        ) : null;

        const buttons = ["To Gray", "Gaussian Blur", "Detail Enhance"].map((name, key) => {
            // console.log(key);
           return  <ListGroup.Item action className={key === this.state.filterSelected ? classes.selected : classes.notSelected} onClick={() => this.filterSelected(key)} key={key}>{name}</ListGroup.Item>
        })
        return (<div className={classes.container}>
            <NavBar></NavBar>
            <Jumbotron fluid className={classes.jumbotron}>
                <h1 className={classes.title}>
                    Filters
                </h1>
                <p className={classes.subTitle}>
                    The place to make up your images
                </p>
                <p> You can upload up to 20 images</p>
            </Jumbotron>
            <div className={classes.body} pointerEvents={this.state.loading? "none": 'auto'}>
                <ImageQueue Queue={this.state.selectedImages} onClick={this.clickOnImage} selectedID={this.state.imageClicked == -1 ? 0 : this.state.imageClicked}></ImageQueue>
                <input type="file"
                    id="image"
                    accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
                <ListGroup>
                    {buttons}
                </ListGroup>
                {result}
            </div>
        </div>
        )
    }
};


export default Filter;