'use client';

import React, { useState } from 'react';
import { RaffleForm } from "@/interfaces/raffleForm";
import Question from './Question';
import { Card, Button } from '@tremor/react';
import { APIService } from '@/services/api';
import { useEffect } from 'react';

interface FormProps {
  raffleForm: RaffleForm;
  handleSendForm: () => void;
}

const Form: React.FC<FormProps> = ({ raffleForm, handleSendForm }) => {
  const [fields, setFields] = useState<Array<string | null>>([null,]);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  useEffect(() => {
    // if the field is required, set it to null
    const initialFields = raffleForm.questions.map(question => question.isRequired ? null : '');
    setFields(initialFields);
  }, [raffleForm.questions]);

  const onFieldChecked = (index: number, newValue: string | null) => {
    const newFields = [...fields];
    newFields[index] = newValue;
    setFields(newFields);
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if all necessary fields are filled
    if (fields.includes(null)) {
      setWarningMessage('Please fill in all required fields');
      return;
    }
    handleSendForm();

  }

  return (
    <Card className="max-w-lg mx-4 my-12 p-8">
      <form onSubmit={submitForm}>
        <h2 className="mb-3 text-center text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {raffleForm.title}
        </h2>
        <p className="mb-12 mt-3 text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {raffleForm.description}
        </p>
        {raffleForm.questions.map((question, index) => (
          <div key={index} className="my-6">
            <Question index={index} questionInfo={question} onFieldChecked={onFieldChecked}/>
          </div>
        ))}
        {warningMessage && (
          <p className="text-red-500">{warningMessage}</p>
        )}
        <Button
          className="my-3 w-full" 
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default Form;
