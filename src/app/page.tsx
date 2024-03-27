import EnterRaffle from "./Enter";
import ToggleTheme from "@/components/ToggleTheme";
import Footer from "@/components/Footer";

// toggle theme component will be at the top right corner

export default function Home() {
  return (
    <main>
      <div className="absolute top-4 right-4">
        <ToggleTheme />
      </div>
      <div className="flex items-center justify-center min-h-screen light">
        <EnterRaffle/>
      </div>
    </main>
  );
}
