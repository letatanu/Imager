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
    { href: '#home', text: 'Palette' },
    { href: '#card', text: 'Filters' },
    { href: '#about', text: 'About' },
];

const createNavItem = ({ href, text, className }) => (
    <NavItem>
        <NavLink href={href} className={className}>{text}</NavLink>
    </NavItem>
)
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
        return <Navbar color="dark" dark expand="md" sticky="top">
                <NavbarBrand href='/'>Imager</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {links.map(createNavItem)}
                    </Nav>
                </Collapse>
            </Navbar>;
      
    };
};

export default NavBar;
