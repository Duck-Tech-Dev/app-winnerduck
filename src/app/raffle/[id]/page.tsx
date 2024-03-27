"use client";

import { useEffect, useState } from "react";
import LocalService from '@/services/LocalService';
import LoadingScreen from "@/components/LoadingScreen";
import { RaffleForm } from "@/interfaces/raffleForm";
import AfterSubmission from "./AfterSubmission";
import ToggleTheme from "@/components/ToggleTheme";
import { APIService } from "@/services/api";
import Form from "./Form";

// Debugging
import { TestForm } from "./test_form";

type Props = {
  params: {
    id: string;
  };
};

export default function RafflePage({ params }: Props) {
  const id = params.id;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<RaffleForm | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (LocalService.checkRaffleID(id)) {
        setIsSubmitted(true);
      }
      const formInfo: RaffleForm = TestForm; //await APIService.getRaffleInfo(id);
      setFormData(formInfo);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const handleSendForm = () => {
    // send the form data to the server
    // ...
    LocalService.addRaffleID(id);
    setIsSubmitted(true);
  }
  // if loading, show loading spinner, if not, show form, if submitted, show success message
  return (
    <main>
      <div className="absolute top-4 right-4">
        <ToggleTheme />
      </div>
      
      {isLoading && (
        <LoadingScreen/>
      )}

      {!isLoading && !isSubmitted && formData && (
        <div className="flex items-center justify-center min-h-screen light">
          <Form raffleForm={formData} handleSendForm={handleSendForm}/>
        </div>
      )}

      {isSubmitted && formData && (
        <AfterSubmission raffleInfo={formData}/>
      )}
    </main>
  );
}