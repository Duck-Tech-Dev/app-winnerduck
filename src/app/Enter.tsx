'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NumberInput, Button, Card, Dialog, DialogPanel } from '@tremor/react';
import LoadingScreen from '@/components/LoadingScreen';
import { APIService } from '@/services/api';

const EnterRaffle: React.FC = () => {
  const [raffleID, setRaffleID] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
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
    if (raffleID.length === 0) return;
    
    setLoading(true);

    // check the server if id is valid
    // if not, show dialog
    // TODO: API comment will be removed after backend route is ready
    const isIDValid = true; // await APIService.checkRaffleID(raffleID);

    if (!isIDValid) {
      setLoading(false);
      setIsDialogOpen(true);
      return;
    }

    // if so, redirect to raffle page
    router.push(`/raffle/${raffleID}`);
  }

  return (
    <>
      {loading && 
        <LoadingScreen/>
      }
      <Card className="mx-auto max-w-sm m-4">
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
      <Dialog open={isDialogOpen} onClose={(val) => setIsDialogOpen(val)} static={true}>
        <DialogPanel>
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Hey There!
          </h3>
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Submitted ID is not valid! Please try again.
          </p>
          <Button className="mt-8 w-full" onClick={() => setIsDialogOpen(false)}>
            Got it!
          </Button>
        </DialogPanel>
      </Dialog>
    </>
  );
}

export default EnterRaffle;
