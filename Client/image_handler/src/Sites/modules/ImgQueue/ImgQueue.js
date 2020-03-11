import React, {Component} from 'react';
import { CardDeck } from 'reactstrap';
import Image_Card from './imageModule/Image';

class ImageQueue extends Component {

    render() {
        console.log(this.props.Queue.length);
        let list = this.props.Queue.map((image) => {
            return <Image_Card key={image.id} id={image.id} image={image.url} onClick={(id) => this.props.onClick(id)} title={image.value}></Image_Card>
        });
        
        return (
            <div>
            <CardDeck>
                {list}
            </CardDeck>
            {/* <div>{this.state.chosenImage}</div> */}
            </div>
        );
    }
}

export default ImageQueue;