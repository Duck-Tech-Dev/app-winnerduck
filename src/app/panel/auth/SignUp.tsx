import React, { useState } from 'react';
import { TextInput, Button } from '@tremor/react';
import { APIService } from '@/services/api';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    APIService.signUp(username, email, password);
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setUsername(e.target.value);
    validateForm();
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setEmail(e.target.value);
    validateForm();
  } 

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setPassword(e.target.value);
    validateForm();
  }

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setConfirmPassword(e.target.value);
    validateForm();
  }

  const validateForm = (): void => {
    if (username.length < 3) {
      setIsFormValid(false);
    }
    else if (email.length < 3) {
      setIsFormValid(false);
    }
    else if (password !== confirmPassword) {
      setIsFormValid(false);
    }
    else if (password.length < 8) {
      setIsFormValid(false);
    }
    setIsFormValid(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="my-3"
        placeholder="Username"
        onChange={onUsernameChange}
      />
      <TextInput
        className="my-3"
        placeholder="Email"
        type="email"
        onChange={onEmailChange}
      />
      <TextInput
        className="my-3"
        placeholder="Password"
        type="password"
        onChange={onPasswordChange}
      />
      <TextInput
        className="my-3"
        placeholder="Confirm Password"
        type="password"
        onChange={onConfirmPasswordChange}
      />
      <Button className="my-3" type="submit" disabled={!isFormValid}>
        Sign Up
      </Button>
    </form>
  );
}

export default SignUp;
