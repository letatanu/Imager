import React, { Component } from 'react';
import NavBar from '../modules/NavigationBar/NavBar';
import classes from './main.module.css';
import { Button, ButtonToolbar, Jumbotron } from "react-bootstrap";

class MainSite extends Component {


    render() {
        return <div className={classes.mainContainter}>
            <NavBar />
            <div className={classes.welcomeContainer}>
                <Jumbotron className={classes.welcomeContainer}>
                    <h1 className={classes.title}>Getting Deeper Understanding</h1>
                    <h1 className={classes.title}>your Images</h1>
                    <p className={classes.subTitle}>This is a place to extract your images'
                    features and "make up" it. If you want to create your palette,
        simply go Palette section and upload your image, we will do the rest</p>
                    <ButtonToolbar>
                        <Button variant="outline-primary" className={classes.button} href="#palette">Palette</Button>
                        <Button variant="outline-primary" className={classes.button} href="#filters">Image Filters</Button>
                    </ButtonToolbar>
                </Jumbotron>

            </div>

        </div>;
    };
};

export default MainSite;
