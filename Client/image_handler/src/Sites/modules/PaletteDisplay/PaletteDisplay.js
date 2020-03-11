import React, {Component} from 'react';
import { Button  } from "react-bootstrap";
import classes from './PaletteDisplay.module.css';

class PaletteDiplays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: this.props.colors
        };
    };

    render() {
        const list = this.state.colors.map((color) => {
            console.log(color.value);
            return <div key={color.id} className={classes.card}>
               <Button style={{backgroundColor: color.value}}/>
                {color.id}  
            </div>
           
        })
        return <div>
            {list}
        </div>
    }
}

export default PaletteDiplays;