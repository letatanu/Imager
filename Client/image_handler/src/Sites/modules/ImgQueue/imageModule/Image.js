import React from 'react';
import { Card } from '@material-ui/core';
import { CardTitle} from 'reactstrap';
import classes from './Image.module.css';

// const Button = styled.button`
//   background: palevioletred;
//   border-radius: 3px;
//   border: none;
//   color: white;
// 
const MAX_LENGTH = 10
const Image_Card = (props) => {
    const background = props.selectedID == props.id ? "#379683" : "#EDF5E1"
    const titleL = props.title.length;
    const title = titleL > MAX_LENGTH ? props.title.substring(0, MAX_LENGTH - 6) + "..." + props.title.substring(titleL - 6, titleL) : props.title;
    return (
        <Card raised onClick={() => props.onClick(props.id)} key={props.id} className={classes.card} style={{ backgroundColor: `${background}` }}>
                <img src={props.image} alt="" className={classes.img}/>  
                <CardTitle>{title}</CardTitle>
        </Card>

    );
};

export default Image_Card;