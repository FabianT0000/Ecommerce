import React from 'react'
import { Card, Button } from 'react-bootstrap';
import exclusive_offer from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    
    <div style={{ display:'flex' ,width: '90%',height:'80vh', margin: 'auto', marginTop:'40px',marginBottom:'10px', padding:'0px 140px',background:'linear-gradient(180deg,rgb(230, 248, 234),#e1ffea22 90%)',borderRadius:'10px' }}>
  
      <Card.Body style={{flex:1 ,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <Card.Title as="h1" style={{color:'#171717',fontSize:'75px',fontWeight:'600'}}>Ofertas </Card.Title>
        <Card.Title as="h1" style={{color:'#171717',fontSize:'75px',fontWeight:'600'}}>Exclusivas para ti</Card.Title>
        <Card.Text style={{color:'#171717',fontSize:'22px',fontWeight:'600'}}>
          No te lo pierdas
        </Card.Text>
        <Button variant="primary">Conocelas aqui</Button>
      </Card.Body>
      <Card.Body style={{flex:1,display:'center',justifyContent:'flex-end',paddingTop:'50px'}}>
          <Card.Img style={{height:'400px', width:'250px' ,marginLeft:'130px'}}src={exclusive_offer}  />
      </Card.Body>
    </div>
  
  )
}

export default Offers