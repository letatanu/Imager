import React, {Component} from 'react';
import { CardDeck } from 'reactstrap';
import ImageCard from './imageModule/Image';

class ImageQueue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.Queue,
            chosenImage: 0
        };
    }
    onClickedImage = (e) => {
        const index = e.target.id;
        this.setState({
            chosenImage: index
        });
    }

    render() {
        let list = this.state.images.map((image) => {
            return <ImageCard img={image} onClick={this.onClickedImage} title={''}></ImageCard>
        });
        
        return (
            <CardDeck>
                {list}
            </CardDeck>
        );
    }
}

export default ImageQueue;