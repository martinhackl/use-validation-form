import React from 'react';
import { Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import { Route, Link, Switch } from 'react-router-dom';

import Installation from './installation';
import Usage from './usage';
import Inputs from './inputs';

import './styles.css';

function Docs() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>useValidationForm</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col md={4} as="aside" className="docs-aside">
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/docs/installation">
                Installation
              </Nav.Link>
              <Nav.Link as={Link} to="/docs/usage">
                Usage
              </Nav.Link>
              <Nav.Link as={Link} to="/docs/inputs">
                Inputs
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={8} as="main" className="docs-main">
            <Switch>
              <Route path="/docs/installation" component={Installation} />
              <Route path="/docs/usage" component={Usage} />
              <Route path="/docs/inputs" component={Inputs} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Docs;
