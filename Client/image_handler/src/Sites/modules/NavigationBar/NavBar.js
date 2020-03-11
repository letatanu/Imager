import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Collapse,
    NavbarToggler
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const links = [
    { id: 1, href: '#palette', text: 'Palette' },
    { id: 2, href: '#filters', text: 'Filters' },
    { id: 3, href: '#about', text: 'About' },
];

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const list = links.map(({ id, href, text, className }) => {
            return <NavItem key={id}>
                <NavLink href={href} className={className} >{text}</NavLink>
            </NavItem>
        })
        return <Navbar color="dark" dark expand="md" sticky="top">
            <NavbarBrand href='/'>Imager</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {list}
                </Nav>
            </Collapse>
        </Navbar>;

    };
};

export default NavBar;
