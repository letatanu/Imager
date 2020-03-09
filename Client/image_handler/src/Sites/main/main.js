import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class MainSite extends Component {
    render() {
        return <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href='/'>Imager</NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/components/">Palette</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/components/">Filters</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/components/">About</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>;
    };
};

export default MainSite;
