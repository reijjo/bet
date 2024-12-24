import "./LoginRegister.css";

import { ChangeEvent, useState } from "react";

import { Button } from "../common/Button";
import { Container } from "../common/container/Container";
import { TextInput } from "../common/inputs/TextInput";

export const Register = () => {
  const [regEmail, setRegEmail] = useState("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setRegEmail(e.target.value);
  };

  return (
    <Container
      width="min(400px, 95%)"
      borderColor="var(--border-50)"
      padding="24px 16px"
      margin="0 auto"
      alignSelf="center"
      boxShadow="var(--shadow-white)"
    >
      <form className="form-register">
        <p className="form-header">Start tracking your bets at Tärpit</p>
        <TextInput
          className="form-input-text"
          type="text"
          label="Email"
          name="regEmail"
          id="regEmail"
          value={regEmail}
          onChange={handleEmail}
          placeholder="user@tarpit.com"
          backgroundColor="var(--primary-800)"
        />
        <Button
          type="submit"
          className="btn btn-filled"
          children="Register"
          width="75%"
        />
      </form>
    </Container>
  );
};
