'use client';

import React, { useEffect, useState } from 'react';
import { TextInput, Button, Card } from '@tremor/react';

const EnterRaffle: React.FC = () => {
  return (
    <>
      <Card className="mx-auto max-w-lg">
        <h4 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">Enter Raffle ID</h4>
        <TextInput/>
        <Button size="xs" variant="primary">
          Enter
        </Button>

      </Card>
    </>
  );
}

export default EnterRaffle;
