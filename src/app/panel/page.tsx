"use client";

import { useEffect } from "react";
import { APIService } from "@/services/api";

export default function Home() {
  const fetchProfile = async () => {
    const connection = await APIService.checkConnection();
  }

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <main>
      <h1>Controle Panel</h1>
    </main>
  );
}