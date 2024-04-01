"use client";

import { useEffect, useState } from "react";
import LocalService from '@/utils/LocalService';

type Props = {
  params: {
    id: string;
  };
};

export default function RafflePage({ params }: Props) {
  const id = params.id;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    if (LocalService.checkRaffleID(id)) {
      setIsSubmitted(true);
    }
    // check if the IP address has already submitted
    // ...
    setIsLoading(false);
  }, [id]);

  const submitForm = () => {
    // send the form data to the server
    // ...
    LocalService.addRaffleID(id);
    setIsSubmitted(true);
  }
  // if loading, show loading spinner, if not, show form, if submitted, show success message
  return (
    <main>
      <h1>{id}</h1>

      {isLoading && (
        <p>Loading...</p>
      )}

      {!isLoading && !isSubmitted && (
        <form onSubmit={submitForm}>
          <input type="text" placeholder="Name" />
          <button type="submit">Submit</button>
        </form>
      )}

      {isSubmitted && (
        <p>You have submitted!</p>
      )}
    </main>
  );
}