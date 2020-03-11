import React from 'react';
import { Button  } from "react-bootstrap";
import classes from './PaletteDisplay.module.css';

const PaletteDiplays = (props) => {
    const rgbToHex = (rgb) => '#' + rgb.map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }).join('')
      
    const list = props.colors? props.colors.map((color, index) => {
        let rgb = rgbToHex(color);
        console.log(rgb);
        return <div key={index} >
           <Button style={{backgroundColor: `${rgb}`}} className={classes.Button}/>
            {rgb}  
        </div>;
    }) : [];   
    
    return <div className={classes.card}>{list}</div>
}

export default PaletteDiplays;