"use client";

import { useEffect } from "react";
import { APIService } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  // this part is used temporarily
  // we need to set up a middleware to check authentication
  useEffect(() => {
    const fetchProfile = async () => {
      const isAuthorized = await APIService.checkConnection();
      if (!isAuthorized) {
        router.push("/panel/auth");
      }
    }
    fetchProfile(); 
  }, [router]);

  return (
    <main>
      <h1>Controle Panel</h1>
    </main>
  );
}
