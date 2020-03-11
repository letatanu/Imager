import React, {Component} from 'react';
import { CardDeck } from 'reactstrap';
import Image_Card from './imageModule/Image';
import classes from './ImgQueue.module.css';
class ImageQueue extends Component {

    render() {
    
        console.log(this.props.Queue.length);
        let list = this.props.Queue.map((image) => {
            return <Image_Card key={image.id} id={image.id} image={image.url} onClick={(id) => this.props.onClick(id)} title={image.image.name} selectedID={this.props.selectedID}></Image_Card>
        });
        
        return ( <div className={classes.CardDeck}>
                {list}
            </div>
           
        );
    }
}

export default ImageQueue;