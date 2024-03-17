import React, { useState } from 'react';
import { TextInput, Button } from '@tremor/react';
import { APIService } from '@/services/api';
import { useRouter } from 'next/navigation';

const LogIn: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    /*
    Send the form to server, if username or password is wrong, show an error message.
    */
    const response = await APIService.signIn(username, password);
    if (!response.ok) {
      console.log('Error: ', response);
      return;
    }
    else {
      router.push('/panel');
    }
  };

  const validateForm = (): void => {
    if (username.length < 1) {
      setIsFormValid(false);
    }
    else if (password.length < 1) {
      setIsFormValid(false);
    }
    setIsFormValid(true);
  }

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setUsername(e.target.value);
    validateForm();
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setPassword(e.target.value);
    validateForm();
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
      <Button type="submit" disabled={!isFormValid}>
        Log In
      </Button>
    </form>
  );
}

export default LogIn;
