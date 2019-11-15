import "./style.css";
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import AUTH from "../../utils/AUTH";

export default function Header({ authenticated, setAuthenticated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [redirect] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const logout = () => {
    AUTH.logout().then(res => {
      if (res.status === 200) {
        console.log("logged out");
        setAuthenticated(false);
      }
    });
  };

  return (
    <div className="mynav">
      {renderRedirect()}
      <Navbar color="light" light expand="md">
        <NavbarBrand className="nav-text" href="/">
          MERN starter
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!authenticated && (
              <Link to="/register">
                <NavItem>
                  <NavLink className="nav-text">Register</NavLink>
                </NavItem>
              </Link>
            )}
            {!authenticated && (
              <Link to="/login">
                <NavItem>
                  <NavLink className="nav-text">Login</NavLink>
                </NavItem>
              </Link>
            )}

            {authenticated && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="nav-text">
                  Menu
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/dashboard">
                    <DropdownItem className="nav-text">Dashboard</DropdownItem>
                  </Link>
                  {/* <Link to="/login">
                    <DropdownItem>Login</DropdownItem>
                  </Link> */}
                  <DropdownItem divider />
                  <Link to="/">
                    <DropdownItem onClick={() => logout()} className="nav-text">
                      Logout
                    </DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
