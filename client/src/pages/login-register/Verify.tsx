import "./LoginRegister.css";

import { SyntheticEvent } from "react";

import { Button, Container, TextInput } from "../../components";

// import { genderOptions } from "../../components/common/inputs/radio-input-options/gender";

export const Verify = () => {
  const EMAIL = "teemu.aitomeri@gmail.com";

  const handleVerifyInput = (e: SyntheticEvent) => {
    e.preventDefault();
  };

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
          Finish creating your account
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
          name="confirm password"
          id="confirm password"
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
