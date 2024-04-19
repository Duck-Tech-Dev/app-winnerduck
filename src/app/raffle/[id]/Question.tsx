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
        <TextInput 
          className="duration-0" 
          onChange={handleInputChanged}/>
      );
    }
    if (questionInfo.type === "email") {
      return (
        <TextInput 
          className="duration-0" 
          onChange={handleInputChanged} 
          placeholder="quack@winner.duck"/>
      );
    }
    if (questionInfo.type === "number") {
      return (
        <NumberInput
          className="duration-0"
          enableStepper={false} 
          onChange={handleInputChanged} 
          min={questionInfo.minimum} 
          max={questionInfo.maximum}/>
      );
    }
    if (questionInfo.type === "phone") {
      return (
          <div className="flex">
            <select className="flex w-auto outline-none w-full outline-none text-left whitespace-nowrap truncate rounded-tremor-default focus:ring-2 transition duration-100 border pr-8 py-2 border-tremor-border shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:border-dark-tremor-border dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted bg-tremor-background border-tremor-border divide-tremor-border shadow-tremor-dropdown dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:divide-dark-tremor-border dark:shadow-dark-tremor-dropdown text-tremor-content-subtle dark:text-dark-tremor-content-subtle">
              <option value="+90" className="flex justify-start items-center cursor-default text-tremor-default px-2.5 py-2.5 ui-active:bg-tremor-background-muted  ui-active:text-tremor-content-strong ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted text-tremor-content-emphasis dark:ui-active:bg-dark-tremor-background-muted  dark:ui-active:text-dark-tremor-content-strong dark:ui-selected:text-dark-tremor-content-strong dark:ui-selected:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis">
                +90
              </option>
            </select>
            <NumberInput
              className="duration-0" 
              onChange={handleInputChanged} 
              enableStepper={false} 
              max={9999999999}
              placeholder="5554443322"/>
          </div>
      );
    }
    if (questionInfo.type === "radio") {
      return (
        <Select 
          className="duration-0" 
          onChange={handleInputValueChanged}>
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
        <MultiSelect 
          className="duration-0" 
          onChange={handleInputValueChanged}>
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
        <DatePicker 
          className="duration-0" 
          onChange={handleInputChanged}/>
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
