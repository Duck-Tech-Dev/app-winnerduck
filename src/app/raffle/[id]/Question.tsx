'use client';

import React from 'react';
import RaffleQuestion from "@/interfaces/raffleQuestion";
import { Card, TextInput, NumberInput, Select, SelectItem, MultiSelect, MultiSelectItem, DatePicker } from '@tremor/react';
import { useEffect } from 'react';

interface QuestionProps {
  index: number;
  questionInfo: RaffleQuestion;
  onFieldChecked: (index: number, newValue: string | null) => void;
}

const getQuestionRegex = (type: string): RegExp => {
  // GIANT TODO: Currently this function is created by 
  // copilot for testing, will be worked on later
  switch (type) {
    case "email":
      return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z])+$/;
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
  const questionRegex = getQuestionRegex(questionInfo.type);
  const isFieldOptional = questionInfo.isOptional && questionInfo.isOptional === true;

  const isFieldValid = async (currentValue: string): Promise<boolean> => {
    if (isFieldOptional) {
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

  const handleInputChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const isValid = await isFieldValid(e.target.value);
    if (!isValid) {
      onFieldChecked(index, null);
    }
    else {
      onFieldChecked(index, e.target.value);
    }
  }

  const handleInputValueChanged = async (newValue: any) => {
    console.log(newValue);
    const isValid = await isFieldValid(newValue);
    if (!isValid) {
      onFieldChecked(index, null);
    }
    else {
      onFieldChecked(index, newValue);
    }
  }

  const inputField = () => {
    if (questionInfo.type === "text") {
      return (
        <TextInput onChange={handleInputChanged}/>
      );
    }
    if (questionInfo.type === "email") {
      return (
        <TextInput 
          onChange={handleInputChanged} 
          placeholder="example@duck.quack"/>
      );
    }
    if (questionInfo.type === "number") {
      return (
        <NumberInput 
            enableStepper={false} 
            onChange={handleInputChanged} 
            min={questionInfo.minimum} 
            max={questionInfo.maximum}/>
      );
    }
    if (questionInfo.type === "phone") {
      return (
          <NumberInput
            onChange={handleInputChanged} 
            enableStepper={false} 
            max={9999999999}
            placeholder="5554443322"/>
      );
    }
    if (questionInfo.type === "radio") {
      return (
        <Select onChange={handleInputValueChanged}>
          {questionInfo.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>
      );
    }
    if (questionInfo.type === "checkbox") {
      return (
        <MultiSelect onChange={handleInputValueChanged}>
          {questionInfo.options?.map((option, index) => (
            <MultiSelectItem key={index} value={option}>
              {option}
            </MultiSelectItem>
          ))}
        </MultiSelect>
      );
    }
    if (questionInfo.type === "slider") {
      return (
        <Card className="m-0 p-2">
          <div className="flex">
            <p className="mr-2 text-xs md:text-sm text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {questionInfo.start}
            </p>
            <input className="w-full outline-none"
                  type="range" 
                  min={questionInfo.start} 
                  max={questionInfo.end} 
                  step={questionInfo.step} 
                  defaultValue={questionInfo.defaultValue} 
                  onChange={handleInputChanged}/>
            <p className="ml-2 text-xs md:text-sm text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {questionInfo.end}
            </p>
          </div>
        </Card>
      );
    }
    if (questionInfo.type === "date") {
      return (
        <DatePicker onChange={handleInputChanged}/>
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
        {!isFieldOptional && (
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
