import React, {Component} from 'react';
import NavBar from '../modules/NavigationBar/NavBar';
import imgQ from '../modules/ImgQueue/ImgQueue';
import PaletteDiplays from '../modules/PaletteDisplay/PaletteDisplay';
class Palette extends Component {
    render() {
        return(<div>
            <NavBar></NavBar>
            <div>Palette</div>
            <div>The place to get colors from your images</div>
            <div>You can upload up to 20 images</div>
            <imgQ></imgQ>
            <button>Drop image here or Click on to Upload </button>
            <PaletteDiplays></PaletteDiplays>
        </div>
        )
    }
};


export default Palette;