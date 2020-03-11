import React from 'react';
import {Card, CardImg, CardTitle, CardText} from 'reactstrap';
import classes from './Image.module.css';

// const Button = styled.button`
//   background: palevioletred;
//   border-radius: 3px;
//   border: none;
//   color: white;
// 

const Image_Card = (props) => {
    const background = props.selectedID == props.id? "#379683" : "#EDF5E1"
    return (
        <Card onClick={() => props.onClick(props.id)} key={props.id} className={classes.card} style={{backgroundColor: `${background}`}}>
            <CardImg src={props.image} alt=""></CardImg>
            <CardTitle disabled> {props.title} </CardTitle>
        </Card>
       
    );
};

export default Image_Card;