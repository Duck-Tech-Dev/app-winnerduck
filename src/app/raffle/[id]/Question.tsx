'use client';

import React from 'react';
import { Question } from "@/interfaces/raffleForm";
import { TextInput, NumberInput } from '@tremor/react';
import { useEffect } from 'react';

interface QuestionProps {
  questionInfo: Question;
}

const Question: React.FC<QuestionProps> = ({ questionInfo }) => {

  const inputField = () => {
    if (questionInfo.type === "text") {
      return (
        <TextInput/>
      );
    }
    if (questionInfo.type === "number") {
      return (
        <NumberInput enableStepper={false}/>
      );
    }
  }

  return (
    <>
      <h3 className='my-3 text-lg text-center text-tremor-content-strong dark:text-dark-tremor-content-strong'>
        {questionInfo.title}
      </h3>
      <p className='my-3 text-sm text-center text-tremor-content-strong dark:text-dark-tremor-content-strong'>
        {questionInfo.description}
      </p>
      <div className='my-3'>
        {inputField()}
      </div>
    </>
  );
}

export default Question;
