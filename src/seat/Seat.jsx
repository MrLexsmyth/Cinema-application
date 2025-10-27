import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Paystackpop from "@paystack/inline-js";
import Footer from "../components/Footer/Footer";
import { Input, Stack, Button, Container, Center } from "@chakra-ui/react";

const Seat = () => {
  const location = useLocation();
  const totalAmount = location.state?.total || 0; 

  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(totalAmount); 

  const paywithpaystack = (e) => {
    e.preventDefault();
    const paystack = new Paystackpop();
    paystack.newTransaction({
      key: "pk_test_6d158952b7cf3aec91860810293e018fd059514d",
      amount: amount * 100,
      email,
      firstname,
      onSuccess(transaction) {
        alert(`Payment Successful! Reference ${transaction.reference}`);
        setEmail("");
        setAmount(totalAmount);
        setFirstname("");
      },
      onCancel() {
        alert("Transaction Cancelled");
      },
    });
  };

  return (
    <Container maxW="2xl" bg="black">
      <Center fontSize="50px" color="red" as="b">
        Make Payment
      </Center>

      <Stack spacing={25} alignItems="center" justifyContent="center" maxW="md">
        <Input
          width="50%"
          type="text"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <Input
          width="50%"
          type="text"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          width="50%"
          type="number"
          value={amount}
          readOnly
          placeholder="Amount"
        />

        <Button type="submit" width="50%" onClick={paywithpaystack}>
          Payment
        </Button>
      </Stack>
      <Footer />
    </Container>
  );
};

export default Seat;
