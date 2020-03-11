import React, { Component } from 'react';
import NavBar from '../modules/NavigationBar/NavBar';
import ImageQueue from '../modules/ImgQueue/ImgQueue';
import { Jumbotron, ListGroup } from "react-bootstrap";
import classes from './Filter.module.css';
import axios from 'axios';

import 'rc-slider/assets/index.css';

const tasks = ["toGray", "Gaussian", "Detail" ]

class Filter extends Component {
    state = {
        selectedImages: [],
        processedImg: [],
        currentResult: 0,
        task: 'toGray',
        imageClicked: -1,
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
                    url: URL.createObjectURL(selectedImage)
                }],
                imageClicked: l
            }));
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
            }
        })
            .then(res => {
                data = res.data
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
                    currentResult: urls.host + res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

    };
    filterSelected = (id) => {
        console.log(id);
        this.setState({
            task: tasks[id]
        })
        if (this.state.imageClicked !== -1) {
            this.GetPostHandlers(this.state.selectedImages[this.state.imageClicked].image, tasks[id], this.state.imageClicked);
        }
    }
    render() {
        return (<div>
            <NavBar></NavBar>
            <Jumbotron fluid className={classes.jumbotron}>
                <h1>
                    Filters
                </h1>
                <p>
                    The place to make up your images
                </p>
                <p> You can upload up to 20 images</p>
            </Jumbotron>
            <ImageQueue Queue={this.state.selectedImages} onClick={this.clickOnImage}></ImageQueue>
            <input type="file"
                id="image"
                accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
            <ListGroup>
                <ListGroup.Item action variant="success" onClick={() => this.filterSelected(0)}>To Gray</ListGroup.Item>
                <ListGroup.Item action variant="danger" onClick={() => this.filterSelected(1)}>Gaussian Blurring</ListGroup.Item>
                <ListGroup.Item action variant="warning" onClick={() => this.filterSelected(2)}>Detail Enhancing</ListGroup.Item>
            </ListGroup>
            <img src={this.state.currentResult} alt=""></img>
        </div>
        )
    }
};


export default Filter;