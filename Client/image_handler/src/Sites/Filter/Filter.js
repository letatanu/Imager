import React, {Component} from 'react';
import { Button, ButtonToolbar, Jumbotron } from "react-bootstrap";
import classes from './Filter.module.css';
import NavBar from '../modules/NavigationBar/NavBar';

class Filters extends Component {
    render() {
        return(<div>
            <NavBar></NavBar>
            <Jumbotron fluid className={classes.jumbotron}>
                <h1>
                    Filters
                </h1>
                <p>
                The place to apply filters to your images.
                </p>
                <p> You can upload up to 20 images</p>
            </Jumbotron>
        </div>)
    };
}

export default Filters;