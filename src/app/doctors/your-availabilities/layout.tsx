'use client';

import { ReactNode } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Tabs
      defaultValue="view"
      className="w-full fixed"
    >
      <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-slate-950">

        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="view">
            View Availability
          </TabsTrigger>

          <TabsTrigger value="add">
            Add Availability
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="view">
        {/* Your view availability component */}
      </TabsContent>

      <TabsContent value="add">
        {children}
      </TabsContent>
    </Tabs>
  );
}