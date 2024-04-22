import RaffleForm from "@/interfaces/raffleForm";

export const TestForm: RaffleForm = {
  id: "10101010",
  title: "Test Form",
  description: "This is a test form, Regular Show is crazy maan, yeyyooo",
  questions: [
    {
      title: "Name & Surname",
      description: "Please enter your full name",
      type: "text",
    },
    {
      title: "Phone Number",
      description: "A phone number we can reach you at",
      type: "phone",
    },
    {
      title: "Email",
      description: "Please enter an email address we can reach you at",
      type: "email",
    },
    {
      title: "Age",
      description: "Please enter your age",
      type: "number",
    },
    {
      title: "Select",
      description: "Please select an option",
      type: "radio",
      options: ["Option 1", "Option 2", "Option 3"],
    },
    {
      title: "Select Multiple",
      description: "Please select multiple options",
      type: "checkbox",
      options: ["Option 1", "Option 2", "Option 3"],
    },
    {
      title: "Date",
      description: "Please select a date",
      type: "date",
    },
    {
      title: "Slider",
      description: "Please select a value",
      type: "slider",
      start: 0,
      end: 10,
      step: 1,
      defaultValue: 5,
    },
  ]
};
