import { RaffleForm } from "@/interfaces/raffleForm";

export const TestForm: RaffleForm = {
  id: "10101010",
  title: "Test Form",
  description: "This is a test form, Regular Show is crazy maan, yeyyooo",
  questions: [
    {
      title: "Name & Surname",
      description: "Please enter your full name",
      type: "text",
      template: "none",
      isRequired: true
    },
    {
      title: "Phone Number",
      description: "A phone number we can reach you at",
      type: "text",
      template: "phone",
      isRequired: true
    },
    {
      title: "Email",
      description: "Please enter an email address we can reach you at",
      type: "text",
      template: "email",
      isRequired: false
    },
    {
      title: "Age",
      description: "Please enter your age",
      type: "number",
      template: "none",
      isRequired: true
    },
  ]
};
