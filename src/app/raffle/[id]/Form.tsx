'use client';

import React from 'react';
import { RaffleForm } from "@/interfaces/raffleForm";
import Question from './Question';
import { Card, Button } from '@tremor/react';
import { APIService } from '@/services/api';
import { useEffect } from 'react';

interface FormProps {
  raffleForm: RaffleForm;
  sendForm: () => void;
}

const Form: React.FC<FormProps> = ({ raffleForm, sendForm }) => {
  const submitForm = () => {
    sendForm();
    // ...APIService.sendForm... and stuff
  }

  return (
    <Card className="max-w-lg mx-4 my-12 p-8">
      <form>
        <h2 className="mb-3 text-center text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {raffleForm.title}
        </h2>
        <p className="mb-12 mt-3 text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {raffleForm.description}
        </p>
        {raffleForm.questions.map((question, index) => (
          <div key={index} className="my-6">
            <Question questionInfo={question}/>
          </div>
        ))}
        <Button
          className="my-3 w-full" 
          variant="primary"
          onClick={submitForm}>
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default Form;
