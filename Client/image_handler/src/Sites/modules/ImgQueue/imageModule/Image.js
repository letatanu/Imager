import React from 'react';
import {Card, CardImg, CardTitle} from 'reactstrap';

// const Button = styled.button`
//   background: palevioletred;
//   border-radius: 3px;
//   border: none;
//   color: white;
// 

const Image_Card = (props) => {
    // console.log(props.title);
    return (
        <Card onClick={() => props.onClick(props.id)} key={props.id}>
            <CardImg src={props.image} alt=""></CardImg>
            <CardTitle> {props.title} </CardTitle>
        </Card>
    );
};

export default Image_Card;