import "./LoginRegister.css";

import { ChangeEvent, useState } from "react";

import { Button, Container, TextInput } from "../../components";
import { RegisterValues } from "../../utils/types";

// import { genderOptions } from "../../components/common/inputs/radio-input-options/gender";
const EMAIL = "teemu.aitomeri@gmail.com";
const user = {
  email: EMAIL,
  username: "",
  password: "",
};

export const Verify = () => {
  const [regUser, setRegUser] = useState<RegisterValues>(user);

  const handleVerifyInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegUser({ ...regUser, [name]: value });
  };

  console.log("regUser:", regUser);
  return (
    <Container
      width="min(400px, 95%)"
      border="0.5px solid"
      borderColor="var(--primary-700)"
      padding="24px 16px"
      margin="0 auto"
      alignSelf="center"
      boxShadow="var(--box-shadow)"
      gap="16px"
    >
      <form className="form-register">
        <p className="form-header" style={{ marginBottom: 0 }}>
          Create account
        </p>
        <p style={{ marginBottom: 8 }}>{EMAIL}</p>
        <TextInput
          className="form-input-text"
          type="text"
          label="Username"
          name="username"
          id="username"
          placeholder="username"
          onChange={handleVerifyInput}
        />
        <TextInput
          className="form-input-text"
          type="text"
          label="Password"
          name="password"
          id="password"
          placeholder="password"
          onChange={handleVerifyInput}
        />
        <TextInput
          className="form-input-text"
          type="text"
          label="Confirm password"
          name="password2"
          id="password2"
          placeholder="confirm password"
          onChange={handleVerifyInput}
        />
        {/* <Radio
          name="gender"
          options={genderOptions}
          height="2rem"
          onChange={handleVerifyInput}
        /> */}
        <Button
          type="submit"
          className="btn btn-filled"
          children="create account"
          width="75%"
          margin="1rem 0 0"
        />
      </form>
    </Container>
  );
};
