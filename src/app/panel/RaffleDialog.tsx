'use client';

import React, { useState } from 'react';
import RaffleForm from '@/interfaces/raffleForm';
import { RiCloseFill } from "@remixicon/react"
import { useRouter } from 'next/navigation';
import { NumberInput, Button, Card, Dialog, DialogPanel } from '@tremor/react';
import LoadingScreen from '@/components/LoadingScreen';
import { APIService } from '@/services/api';


interface Props {
  raffle: RaffleForm;
  isOpen: boolean;
  onClose: () => void;
}

const RaffleDialog: React.FC<Props> = ({ raffle, isOpen, onClose }) => {

  const closeDialog = () => {
    onClose();
  }

  return (
    <Dialog open={isOpen} onClose={closeDialog} static={true}>
      {isOpen &&
        <DialogPanel>
          <div className="flex flex-row items-end">
            <button onClick={closeDialog} className="ml-auto">
              <RiCloseFill/>
            </button>
          </div>
          <h1 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {raffle.title}
          </h1>
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            {raffle.description}
          </p>
          <Button className="mt-8 w-full" onClick={closeDialog}>
            Got it!
          </Button>
        </DialogPanel>
      }
    </Dialog>
  );
}

export default RaffleDialog;
