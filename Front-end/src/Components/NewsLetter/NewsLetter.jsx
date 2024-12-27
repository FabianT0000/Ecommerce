import React from 'react'
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewsLetter = () => {
  return (
    <Card style={{ width: '90%', alignItems:'center',margin:'auto',marginTop:'-90px', marginBottom:'0px',background:'linear-gradient(180deg,rgb(230, 248, 234),#e1ffea22 90%)' }}>
    <Card.Body>
      <Card.Title as='h1'>OBTÉN OFERTAS EXCLUSIVAS EN TU CORREO</Card.Title>
      <Card.Subtitle className="mb-2 text-muted ">Suscríbete y permanece actualizado</Card.Subtitle>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Ingresa tu correo"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
      </InputGroup>
      <Button  variant="primary"  >Subscribirse</Button>
    </Card.Body>
  </Card>
  )
}

export default NewsLetter