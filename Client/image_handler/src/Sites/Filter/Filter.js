import React, { Component } from 'react';
import NavBar from '../modules/NavigationBar/NavBar';
import ImageQueue from '../modules/ImgQueue/ImgQueue';
import { Jumbotron, ListGroup } from "react-bootstrap";
import classes from './Filter.module.css';
import axios from 'axios';
import { Card, CardImg, CardTitle } from 'reactstrap';
import { CircularProgress, Grid, Button } from "@material-ui/core";

import { GoPlus } from 'react-icons/go';
import { TiEquals } from 'react-icons/ti';
const tasks = ["toGray", "Gaussian", "Detail"]


class Filter extends Component {
    state = {
        selectedImages: [],
        task: 'toGray',
        selectedID: -1,
        loading: false,
    };

    handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        let l = this.state.selectedImages.length;
        if (l + 1 <= 20) {
            this.setState((prevState) => ({
                selectedImages: [...prevState.selectedImages,
                {
                    id: l,
                    image: selectedImage,
                    url: URL.createObjectURL(selectedImage),
                    processedImg: {}
                }],
                selectedID: l,
                loading: true
            }));
            this.GetPostHandlers(selectedImage, this.state.task, l);
        }
    };

    clickOnImage = (id) => {
        console.log("image", this.state.selectedImages[id]);
        this.setState({
            selectedID: id,
        });

        try {
            const check_result = this.state.selectedImages[id];
            if (this.state.task in check_result.processedImg) {
                console.log(check_result);
                this.setState({
                    loading: false
                });
            } else {
                this.setState({
                    loading: true
                })
                this.GetPostHandlers(this.state.selectedImages[id].image, this.state.task, id);
            }
        }
        catch (error) {
            console.log("get error");
            this.setState({
                loading: true
            })
            try {
                this.GetPostHandlers(this.state.selectedImages[id].image, this.state.task, id);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    GetPostHandlers = async (image, task, id) => {
        this.setState({
            loading: true
        })
        const urls = {
            host: "https://serverimage.herokuapp.com",
            post: 'https://serverimage.herokuapp.com/api/posts/'
        }
        let data = null;
        let form_data = new FormData();
        form_data.append('image', image);
        form_data.append('task', task);
        form_data.append("image_id", id);
        let url = urls.post;
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            },
            timeout: 60 * 4 * 1000
        })
            .then(res => {
                data = res.data;
                console.log(data);
                const processedID = data.image_id;
                const url_result = data.url_result;
                const task = data.task;
                console.log(task);
                // console.log(Math.ceil(res.data.count / res.data.results.length))
                let procImage = [...this.state.selectedImages];
                const index = procImage.findIndex(x => x.id === processedID);
                // console.log("index", index);
                if (index !== -1) {
                    procImage[index].processedImg[task] = urls.host + url_result;
                    this.setState({
                        selectedImages: [...procImage],
                        loading: false
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })

    };

    filterSelected = (id) => {
        console.log("Filter id", tasks[id]);
        console.log("image selected", this.state.selectedID);
        this.setState({
            task: tasks[id]
        });
        try {

            const check_result = this.state.selectedImages[this.state.selectedID];
            if (tasks[id] in check_result.processedImg) {
                console.log(check_result);
                this.setState({
                    loading: false
                })
            } else {
                this.setState({
                    loading: true
                })
                this.GetPostHandlers(this.state.selectedImages[this.state.selectedID].image, tasks[id], this.state.selectedID);
            }
        }
        catch (error) {
            console.log("get error");
            this.setState({
                loading: true
            })
            try {
                this.GetPostHandlers(this.state.selectedImages[this.state.selectedID].image, tasks[id], this.state.selectedID);
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    render() {
        // console.log("id", this.state.selectedID);
        const selectedImg = this.state.selectedImages[this.state.selectedID];
        let sample = null;
        let result = this.state.loading ? <CircularProgress color="secondary" /> : null;
        if (selectedImg) {
            sample = <Card className={classes.retunedImg}>
                <CardImg src={selectedImg.url} alt="Before" ></CardImg>
                <CardTitle disabled> Before </CardTitle>
            </Card>
            const tmp = selectedImg.processedImg[this.state.task];
            if (tmp && !this.state.loading) {
                result = <Card className={classes.retunedImg}>
                    <CardImg src={tmp} alt="After"></CardImg>
                    <CardTitle disabled> After </CardTitle>
                </Card>;
            }
        }



        const buttons = ["To Gray", "Gaussian Blur", "Detail Enhance"].map((name, key) => {
            // console.log(key);
            return <Button color="secondary" variant="contained" onClick={() => this.filterSelected(key)} key={key} style={{margin: "1em"}}>{name}</Button>
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
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item className={classes.choosingImage} xs={12}>
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

                    </Grid>

                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <ImageQueue Queue={this.state.selectedImages} onClick={this.clickOnImage} selectedID={this.state.selectedID === -1 ? 0 : this.state.selectedID} />
                    </Grid>
                    <Grid item xs={4} />



                </Grid>
                {this.state.selectedImages.length === 0 ? null : <Grid container spacing={0}>
                    <Grid item className={classes.choosingImage} xs={12} />

                    <Grid item xs={4} className={classes.temp}>
                        {sample}
                    </Grid>
                    <Grid item xs={1} className={classes.temp}> <GoPlus /> </Grid>
                    <Grid item xs={2} className={classes.temp}> {buttons} </Grid>
                    <Grid item xs={1} className={classes.temp}> <TiEquals /> </Grid>
                    <Grid item xs={4} className={classes.temp}>
                    {this.state.task}
                        {result}
                    </Grid>
                </ Grid >}
            </div>
        </div>
        )
    }
};


export default Filter;