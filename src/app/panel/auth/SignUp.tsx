import React, { useState } from 'react';
import { TextInput, Button } from '@tremor/react';
import { APIService } from '@/services/api';
import { useRouter } from 'next/navigation';

const userNameRegex = /^[a-zA-Z0-9_\-.!?]+$/;
const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
const passwordRegex = /^[a-zA-Z0-9_\-.!?]+$/;

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const router = useRouter();

  const validateForm = (): boolean => {
    if (username.length < 3 || username.length > 32) {
      setErrorMessage('Username must be between 3 and 32 characters long');
      return false;
    }
    if (!userNameRegex.test(username)) {
      setErrorMessage('Username cannot contain special characters');
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email');
      return false;
    }
    if (password.length < 8 || password.length > 32) {
      setErrorMessage('Password must be between 8 and 32 characters long');
      return false;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password cannot contain special characters');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    setErrorMessage("Everything is cool buddy");
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) return;

    const response = await APIService.signUp(username, email, password);
    if (!response.ok) {
      console.log('Error on SignUp: ', response);
      return;
    }
    router.push('/panel');
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  } 

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
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
        error={false}
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
      <p className="text-red-500 my-3">{errorMessage}</p>
      <Button className="my-3" type="submit">
        Sign Up
      </Button>
    </form>
  );
}

export default SignUp;
