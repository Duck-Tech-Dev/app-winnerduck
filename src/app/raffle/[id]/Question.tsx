'use client';

import React from 'react';
import { Question } from "@/interfaces/raffleForm";
import { Card, TextInput, NumberInput } from '@tremor/react';
import { useEffect } from 'react';

interface QuestionProps {
  index: number;
  questionInfo: Question;
  onFieldChecked: (index: number, newValue: string | null) => void;
}

const getQuestionRegex = (template: string): RegExp => {
  // GIANT TODO: Currently this function is created by 
  // copilot for testing, will be worked on later
  switch (template) {
    case "email":
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    case "phone":
      return /^\d{10}$/;
    case "number":
      return /^\d+$/;
    case "text":
      return /./; // sould be removed from special characters that might become dangerous
    default:
      return /./;
  }
}

const Question: React.FC<QuestionProps> = ({ index, questionInfo, onFieldChecked }) => {
  const [fieldError, setFieldError] = React.useState<string | null>(null);
  const questionRegex = getQuestionRegex(questionInfo.template);

  const isFieldValid = async (currentValue: string): Promise<boolean> => {
    if (!questionInfo.isRequired) {
      setFieldError(null);
      return true;
    }
    if (currentValue === '') {
      setFieldError('This field is required');
      return false
    }
    if (!questionRegex.test(currentValue)) {
      setFieldError('Invalid input');
      return false;
    }
    setFieldError(null);
    return true;
  }

  const handleInputValueChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = await isFieldValid(e.target.value);
    if (!isValid) {
      onFieldChecked(index, null);
    }
    else {
      onFieldChecked(index, e.target.value);
    }
  }

  const inputField = () => {
    if (questionInfo.type === "text") {
      return (
        <TextInput onChange={handleInputValueChanged}/>
      );
    }
    if (questionInfo.type === "number") {
      return (
        <NumberInput enableStepper={false} onChange={handleInputValueChanged}/>
      );
    }
  }

  return (
    <Card 
      className="p-4 my-4 md:max-w-lg md:my-8 md:p-4 "
      decoration="left"
      >
      <div className="flex">
        <h3 className="mb-3 font-semibold text-sm md:text-lg text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {questionInfo.title}
        </h3>
        {questionInfo.isRequired && (
          <p className="text-red-500 ml-2 text-xs md:text-sm">*</p>
        )}
      </div>
      <p className="mb-3 text-xs md:text-sm text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {questionInfo.description}
      </p>
      <div className="my-3">
        {inputField()}
      </div>
      {fieldError && (
        <p className="text-red-500 my-3">
          {fieldError}
        </p>
      )}
    </Card>
  );
}

export default Question;
