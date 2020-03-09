import React from 'react';
import {Card, CardImg, CardTitle} from 'reactstrap';

// const Button = styled.button`
//   background: palevioletred;
//   border-radius: 3px;
//   border: none;
//   color: white;
// `

const Image_Card = (props) => {
    return (
        <Card>
            <CardImg src={this.props.img} alt=""></CardImg>
            <CardTitle> {this.props.title} </CardTitle>
        </Card>
    );
};

export default Image_Card;