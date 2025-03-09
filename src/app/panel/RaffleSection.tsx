'use client';

import { useState } from 'react';
import { NumberInput, Button, Card, Dialog, DialogPanel } from '@tremor/react';
import { APIService } from '@/services/api';
import RaffleForm, { RaffleStatus } from '@/interfaces/raffleForm';
import RaffleDialog from './RaffleDialog';

interface Props {
  raffles: RaffleForm[];
}

const RaffleSection: React.FC<Props> = ({ raffles }) => {
  const [selectedRaffle, setSelectedRaffle] = useState<number>(-1);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const draft = raffles.filter(raffle => raffle.status === RaffleStatus.draft);
  const ready = raffles.filter(raffle => raffle.status === RaffleStatus.ready);
  const running = raffles.filter(raffle => raffle.status === RaffleStatus.running);
  const finished = raffles.filter(raffle => raffle.status === RaffleStatus.finished);
  const archived = raffles.filter(raffle => raffle.status === RaffleStatus.archived);

  const openRaffleDialog = (index: number) => {
    console.log(`Opening raffle dialog for raffle ${index}`);
    setSelectedRaffle(index);
    setIsDialogOpen(true);
  }

  const closeDialog = () => {
    console.log("Closing raffle dialog");
    setSelectedRaffle(-1);
    setIsDialogOpen(false);
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-24 gap-x-24 gap-y-16">
      {/* Draft Raffles */}
      <div>
        <h1 className="text-2xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Draft Raffles
        </h1>
        {draft.length === 0 && 
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            No draft raffles
          </p>
        }
        {draft.map((raffle, index) => (
          <Card key={raffle.id} className="flex flex-col justify-between">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {raffle.title}
              </h1>
              <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {raffle.description}
              </p>
            </div>
            <Button onClick={() => openRaffleDialog(index)}>
              Show Me
            </Button>
          </Card>
        ))}
      </div>
      {/* Ready Raffles */}
      <div>
        <h1 className="text-2xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Ready Raffles
        </h1>
        {ready.length === 0 && 
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            No ready raffles
          </p>
        }
        {ready.map((raffle, index) => (
          <Card key={raffle.id} className="flex flex-col justify-between">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {raffle.title}
              </h1>
              <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {raffle.description}
              </p>
            </div>
            <Button onClick={() => openRaffleDialog(index)}>
              Show Me
            </Button>
          </Card>
        ))}
      </div>
      {/* Running Raffles */}
      <div>
        <h1 className="text-2xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Running Raffles
        </h1>
        {running.length === 0 && 
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            No running raffles
          </p>
        }
        {running.map((raffle, index) => (
          <Card key={raffle.id} className="flex flex-col justify-between">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {raffle.title}
              </h1>
              <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {raffle.description}
              </p>
            </div>
            <Button onClick={() => openRaffleDialog(index)}>
              Show Me
            </Button>
          </Card>
        ))}
      </div>
      {/* Finished Raffles */}
      <div>
        <h1 className="text-2xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Finished Raffles
        </h1>
        {finished.length === 0 && 
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            No finished raffles
          </p>
        }
        {finished.map((raffle, index) => (
          <Card key={raffle.id} className="flex flex-col justify-between">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {raffle.title}
              </h1>
              <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {raffle.description}
              </p>
            </div>
            <Button onClick={() => openRaffleDialog(index)}>
              Show Me
            </Button>
          </Card>
        ))}
      </div>
      {/* Archived Raffles */}
      <div>
        <h1 className="text-2xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Archived Raffles
        </h1>
        {archived.length === 0 && 
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            No archived raffles
          </p>
        }
        {archived.map((raffle, index) => (
          <Card key={raffle.id} className="flex flex-col justify-between">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {raffle.title}
              </h1>
              <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {raffle.description}
              </p>
            </div>
            <Button onClick={() => openRaffleDialog(index)}>
              Show Me
            </Button>
          </Card>
        ))}
      </div>
      <RaffleDialog raffle={raffles[selectedRaffle]} onClose={closeDialog} isOpen={isDialogOpen}/>
    </div>
  );
}

export default RaffleSection;
