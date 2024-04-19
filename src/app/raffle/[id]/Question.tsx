'use client';

import React from 'react';
import RaffleQuestion from "@/interfaces/raffleQuestion";
import { Card, TextInput, NumberInput, Select, SelectItem, MultiSelect, MultiSelectItem, DatePicker, DatePickerValue } from '@tremor/react';

interface QuestionProps {
  index: number;
  questionInfo: RaffleQuestion;
  onFieldChecked: (index: number, newValue: string | string[] | null) => void;
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


  //#region Field Validation

  const isFieldValid = async (currentValue: string): Promise<boolean> => {
    if (isFieldOptional) {
      setFieldError(null);
      return true;
    }
    if (currentValue === '') {
      setFieldError('This field is required');
      return false
    }
    if (!questionRegex.test(currentValue as string)) {
      setFieldError('Invalid input');
      return false;
    }
    setFieldError(null);
    return true;
  }

  const isSelectFieldValid = async (currentValue: string): Promise<boolean> => {
    if (isFieldOptional) {
      setFieldError(null);
      return true;
    }
    if (currentValue === '') {
      setFieldError('This field is required');
      return false;
    }
    setFieldError(null);
    return true;
  }

  const isMultiFieldValid = async (currentValue: string[]): Promise<boolean> => {
    if (isFieldOptional) {
      setFieldError(null);
      return true;
    }
    if (currentValue.length === 0) {
      setFieldError('This field is required');
      return false;
    }
    setFieldError(null);
    return true;
  }

  const isDateFieldValid = async (currentValue: string): Promise<boolean> => {
    // currentValue is ISO string date
    if (isFieldOptional) {
      setFieldError(null);
      return true;
    }
    if (currentValue === '') {
      setFieldError('This field is required');
      return false;
    }
    setFieldError(null);
    return true;
  }

  //#endregion

  //#region Handling Input Changes

  const handleInputChanged = async (element: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = await isFieldValid(element.target.value);
    if (!isValid) {
      onFieldChecked(index, null);
    }
    else {
      onFieldChecked(index, element.target.value);
    }
  }

  const handleSelectInputChanged = async (selected: string) => {
    const isValid = await isSelectFieldValid(selected);
    if (!isValid) {
      onFieldChecked(index, null);
    }
    else {
      onFieldChecked(index, selected);
    }
  }

  const handleMultiSelectInputChanged = async (allSelected: string[]) => {
    const isValid = await isMultiFieldValid(allSelected);
    if (!isValid) {
      onFieldChecked(index, null);
    }
    else {
      onFieldChecked(index, allSelected);
    }
  }

  const handleSliderInputChanged = async (element: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = await isFieldValid(element.target.value);
    // get slider-output keyed element
    const sliderOutput = document.getElementById("slider-output");
    if (sliderOutput) {
      sliderOutput.textContent = element.target.value;
    }
    if (!isValid) {
      onFieldChecked(index, null);
    }
    else {
      onFieldChecked(index, element.target.value);
    }
  }

  const handleDateInputChanged = async (selectedDate: DatePickerValue) => {
    const date = selectedDate as Date;
    const value = date ? date.toISOString() : '';
    const isValid = await isDateFieldValid(value);
    if (!isValid) {
      onFieldChecked(index, null);
    }
    else {
      onFieldChecked(index, value);
    }
  }

  //#endregion

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
          onValueChange={handleSelectInputChanged}>
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
          onValueChange={handleMultiSelectInputChanged}>
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
                    defaultValue={questionInfo.defaultValue || questionInfo.end} 
                    onChange={handleSliderInputChanged}/>
            <p id="slider-output" className="ml-2 text-xs md:text-sm text-tremor-content-strong dark:text-dark-tremor-content-strong"></p>
          </div>
        </Card>
      );
    }
    if (questionInfo.type === "date") {
      return (
        <DatePicker 
          className="duration-0"
          onValueChange={handleDateInputChanged}/>
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
