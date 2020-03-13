import React from 'react';
import {Box} from "@material-ui/core";
import classes from './PaletteDisplay.module.css';

const PaletteDiplays = (props) => {
    const rgbToHex = (rgb) => '#' + rgb.map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }).join('')
      
    const list = props.colors? props.colors.map((color, index) => {
        let rgb = rgbToHex(color);
        // console.log(rgb);
        return <div key={index} className={classes.card}>
           <Box boxShadow={3} bgcolor={rgb} className={classes.Button}/>
            {index+1}. {rgb}  
        </div>;
    }) : [];   
    
    return <div className={classes.container}>{list}</div>
}

export default PaletteDiplays;