'use client';

import { Card, Tab, TabGroup, TabList, TabPanels, TabPanel } from "@tremor/react";
export default function Home() {
  return (
    <div className="flex items-center justify-center ">
      <Card className="mx-auto max-w-sm space-y-8 flex justify-center align-center">
        <TabGroup>
          <TabList variant="line" defaultValue="1">
            <Tab value="1">Log In</Tab>
            <Tab value="2">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            </TabPanel>
            <TabPanel>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  );
};
