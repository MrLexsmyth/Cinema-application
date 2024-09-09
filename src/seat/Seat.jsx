import React from "react";
import "./seat.css";
import { useState, useEffect, useCallback } from "react";
import Footer from "../components/Footer/Footer";
import Paystackpop from "@paystack/inline-js";
import {
  Input,
  Stack,
  Button,
  Container,
  Text,
  Center,
} from "@chakra-ui/react";

const Seat = () => {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const paywithpaystack = (e) => {
    e.preventDefault();
    const paystack = new Paystackpop();
    paystack.newTransaction({
      key: "pk_test_6d158952b7cf3aec91860810293e018fd059514d",
      amount: amount * 100,
      email,
      firstname,

      onSuccess(transaction) {
        let message = `Payment Successful! Reference ${transaction.reference}`;
        alert(message);
        setEmail("");
        setAmount("");
        setFirstname("");
      },
      onCancel() {
        alert("Transaction Cancelled");
      },
    });
  };

  return (
    <Container maxW="2xl" bg="black">
      <Center   fontSize="50px" color="red" as="b">
        Make Payment.
      </Center>
      <Stack
        spacing={25}
        alignItems="center"
        mb={15}
        justifyContent="center"
        maxW="md"
      >
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
          type="text"
          value={amount}
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <Button type="submit" width="50%" onClick={paywithpaystack}>
          {" "}
          Payment
        </Button>
      </Stack>
      <Footer  />
    </Container>
  );
};

export default Seat;
