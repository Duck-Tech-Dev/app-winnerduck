import React, { useState } from 'react';
import { TextInput, Button } from '@tremor/react';
import { APIService } from '@/services/api';
import { useRouter } from 'next/navigation';

const userNameRegex = /^[a-zA-Z0-9_\-.!?]+$/;
const passwordRegex = /^[a-zA-Z0-9_\-.!?]+$/;

const LogIn: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
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
    if (password.length < 3 || password.length > 32) {
      setErrorMessage('Password must be between 3 and 32 characters long');
      return false;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password cannot contain special characters');
      return false;
    }
    setErrorMessage("Everything is cool buddy");
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // get the value of the input fields


    const isFormValid = validateForm();
    if (!isFormValid) return;

    const response = await APIService.logIn(username, password);
    if (!response.ok) {
      console.log('Error: ', response);
      return;
    }
    router.push('/panel');
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="my-3"
        placeholder="Username"
        onChange={onUsernameChange}
      />
      <TextInput 
        className='my-3'
        placeholder="Password"
        type="password"
        onChange={onPasswordChange} 
      />
      <p className="text-red-500 my-3">{errorMessage}</p>
      <Button type="submit">
        Log In
      </Button>
    </form>
  );
}

export default LogIn;
