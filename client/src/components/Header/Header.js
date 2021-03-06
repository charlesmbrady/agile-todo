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

export default function Header({ authenticated, setAuthenticated, setUser }) {
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
        setAuthenticated(false);
        setUser({});
      }
    });
  };

  return (
    <div className="mynav">
      {renderRedirect()}
      <Navbar color="light" light expand="md">
        <NavbarBrand className="nav-text" href="/">
          Agile Todos
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
                  <Link to="/backlog">
                    <DropdownItem className="nav-text">Backlog</DropdownItem>
                  </Link>
                  <Link to="/activesprint">
                    <DropdownItem className="nav-text">
                      Active Sprint
                    </DropdownItem>
                  </Link>
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
