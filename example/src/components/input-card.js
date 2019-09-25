import React from 'react';
import { Card, Form } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function InputCard({ title, label, control, value, error, code }) {
  return (
    <Card style={{ marginTop: '2rem' }}>
      <Card.Header as="h3">{title}</Card.Header>
      <Card.Body>
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          {control()}
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <hr />
        Value: {JSON.stringify(value)}
        <br />
        Error: {error}
        <hr />
        <SyntaxHighlighter language="javascript" style={docco}>
          {code}
        </SyntaxHighlighter>
      </Card.Body>
    </Card>
  );
}

export default InputCard;
