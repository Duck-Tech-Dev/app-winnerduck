"use client";

import RaffleSection from "./RaffleSection";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { APIService } from "@/services/api";
import RaffleForm from '@/interfaces/raffleForm';
import LoadingScreen from '@/components/LoadingScreen';

type Section = "raffles" | "quizes" | "forms";

export default function Home() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<Section>("raffles");
  const [raffles, setRaffles] = useState<RaffleForm[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    const getProfile = async () => {
      // TODO: Implement getProfile
    }
    const fetchRaffles = async () => {
      const response = await APIService.getRaffles();
      if (response.ok) {
        const data = await response.json();
        setRaffles(data);
      }
      else {
        // Handle error
      }
    };
    getProfile();
    fetchRaffles().then(() => setIsLoading(false));
  }, []);

  const logOut = async () => {
    await APIService.logOut();
    router.push('/panel/auth');
    console.log("Logged out");
  }

  return (
    <main>
      {isLoading && 
        <LoadingScreen />
      }
      {/* NavBar  */}
      <div className="fixed top-0 w-full bg-white dark:bg-black z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <img src="/winnerduck.png" alt="WinnerDuck Logo" className="w-8 h-8 rounded-full"/>
            <h1 className="text-2xl font-bold">
              WinnerDuck
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-black dark:text-white outline-none"
              style={{textDecoration: currentSection === "raffles" ? "underline" : ""}}
              onClick={() => setCurrentSection("raffles")}
            >
              Raffles
            </button>
            <button className="text-black dark:text-white outline-none"
              style={{textDecoration: currentSection === "quizes" ? "underline" : ""}}
              onClick={() => setCurrentSection("quizes")}
            >
              Quizes
            </button>
            <button className="text-black dark:text-white outline-none"
              style={{textDecoration: currentSection === "forms" ? "underline" : ""}}
              onClick={() => setCurrentSection("forms")}
            >
              Forms
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-black bg-blue-500 rounded-md"
              onClick={logOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <div className="pt-36">
        {currentSection === "raffles" && <RaffleSection raffles={raffles}/>}
      </div>
    </main>
  );
}
