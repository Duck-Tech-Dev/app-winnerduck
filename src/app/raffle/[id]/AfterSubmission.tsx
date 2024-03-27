'use client';

import React from 'react';
import { RaffleForm } from "@/interfaces/raffleForm";

interface AfterSubmissionProps {
  raffleInfo: RaffleForm
}

const AfterSubmission: React.FC<AfterSubmissionProps> = ({ raffleInfo }) => {
  return (
    <div>
      <h2>Thank you for submitting your form!</h2>
    </div>
  );
}

export default AfterSubmission;
