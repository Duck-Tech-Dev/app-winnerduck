'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, Button, Card } from '@tremor/react';

const EnterRaffle: React.FC = () => {
  const [raffleID, setRaffleID] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setRaffleID(e.target.value);
  }

  const onIDKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitRaffleID();
    }
  }

  const submitRaffleID = async () => {
    // check the server if id is valid

    // if so, redirect to raffle page
    router.push(`/raffle/${raffleID}`);
  }

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <h4 className="my-3 text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          Enter Raffle ID
        </h4>
        <TextInput className="my-3" onChange={onIDChange} onKeyDown={onIDKeyDown}/>
        <Button className="my-3" size="xs" variant="primary" onClick={submitRaffleID}>
          Enter
        </Button>

      </Card>
    </>
  );
}

export default EnterRaffle;
