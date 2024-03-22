'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NumberInput, Button, Card } from '@tremor/react';
import LoadingScreen from '@/components/LoadingScreen';

const EnterRaffle: React.FC = () => {
  const [raffleID, setRaffleID] = useState<string>('');
  const [message, setMessage] = useState<string>('Enter a numeric ID pal ^^');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaffleID(e.target.value);
  }

  const onIDKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitRaffleID();
    }
  }

  const submitRaffleID = async () => {
    setLoading(true);
    // wait for 1 seconds to continue
    await new Promise(resolve => setTimeout(resolve, 1000));

    // check the server if id is valid

    // if so, redirect to raffle page
    router.push(`/raffle/${raffleID}`);
  }

  return (
    <>
      {loading && 
        <LoadingScreen/>
      }
      <Card className="mx-auto max-w-sm">
        <h4 className="my-3 text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          Enter Raffle ID
        </h4>
        <NumberInput 
          className="my-3" 
          enableStepper={false}
          onChange={onIDChange} 
          onKeyDown={onIDKeyDown}/>
        <Button 
          className="my-3" 
          size="xs" 
          variant="primary" 
          onClick={submitRaffleID}>
          Enter
        </Button>
      </Card>
    </>
  );
}

export default EnterRaffle;
