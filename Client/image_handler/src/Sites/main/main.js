import React, { Component } from 'react';
import NavBar from '../modules/NavigationBar/NavBar';
import classes from './main.module.css';
import { Button, ButtonToolbar } from "react-bootstrap";
import {Link} from 'react-router-dom';

class MainSite extends Component {


    render() {
        return <div className={classes.mainContainter}>
            <NavBar />
            <div className={classes.welcomeContainer}>
                <div className={classes.title}>Getting Deeper Understand</div>
                <div className={classes.title}>your Images</div>
                <div className={classes.subTitle}>This is a place to extract your images'
                features and "make up" it. If you want to create your palette,
        simply go Palette section and upload your image, we will do the rest</div>
               <ButtonToolbar>
                    <Button variant="outline-primary" className={classes.button}> <Link to="/palette">Palette</Link></Button>
                    <Button variant="outline-primary" className={classes.button}>Image Filters</Button>
                </ButtonToolbar>
            </div>

        </div>;
    };
};

export default MainSite;
