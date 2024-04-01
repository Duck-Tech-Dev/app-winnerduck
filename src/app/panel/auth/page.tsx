'use client';

import { Card, Tab, TabGroup, TabList, TabPanels, TabPanel } from "@tremor/react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import ToggleTheme from "@/components/ToggleTheme";

export default function Home() {
  return (
    <main>
      <div className="absolute top-4 right-4">
        <ToggleTheme />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="mx-auto max-w-sm space-y-8 p-8">
          <TabGroup>
            <TabList variant="line" defaultValue="1">
              <Tab value="1">Log In</Tab>
              <Tab value="2">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LogIn />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </div>
    </main>
  );
};
