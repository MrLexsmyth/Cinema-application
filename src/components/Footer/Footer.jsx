import React from "react";
import "./footer.css";
import { Container, Box, Flex,Button, Text, Grid, GridItem , Center} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container>
      <Box h="280" alignItems="center" className="vic">
        <Box p="5">
          <Text fontSize="40px">Bookings & Reservations only</Text>
          <Text fontSize={{ base: '20px', md: '25px', lg: '30px' }}>
            Have a private experience with your friends,family or even
            colleagues. Rent out one of our spaces for your birthdays, events
            and premieres.
          </Text>

          <button className="btn ">CONTACT US HERE</button>
        </Box>
      </Box>
     <Center h="280">
     
      <Grid templateColumns='repeat(4, 1fr)' gap={15} p={18}>
        <GridItem>
          <h6 className="bold">COMPANY</h6>
          <p>About us</p>
          <p>Cinemas</p>
          <p>Tickets Prices</p>
        </GridItem>
        <GridItem>
          <h6 className="bold">TERMS</h6>
          <p>General</p>
          <p>Cinemas</p>
          <p>Ticket Sales & Online Booking</p>
          <p>Filmhouse+</p>
        </GridItem>
        <GridItem>
          <h6 className="bold">CONTACT</h6>
          <p>Self Help</p>
          <p>Contact Us</p>
          <p>Advertise With Us</p>
          
        </GridItem>
        <GridItem>
          <h6 className="bold">DOWNLOAD OUR APP</h6>
          <p>About us</p>
          <h6 className="bold">WATCH FILMHOUSE ON</h6>
          <p>Tickets Prices</p>
        </GridItem>
       
        </Grid>
        </Center> 
      <Center>
        <Text  mb={20} as='b'>Shittu Odunayo copyright © 2022</Text>
      </Center>
      
    </Container>
    
  );
};

export default Footer;
