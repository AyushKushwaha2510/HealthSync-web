"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import AllAvailability from "@/features/doctors/components/AllAvailability";
import AddAvailabilityForm from "@/features/doctors/components/AddAvailabilityForm";
import Container from "@/components/Container";

export default function Page() {
  return (
    <Tabs defaultValue="view" className="w-full">
      
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="p-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="view">View Availability</TabsTrigger>
            <TabsTrigger value="add">Add Availability</TabsTrigger>
          </TabsList>
        </div>
      </div>

      {/* Content */}
      <Container>
        <TabsContent value="view">
          <AllAvailability />
        </TabsContent>

        <TabsContent value="add">
          <AddAvailabilityForm />
        </TabsContent>
      </Container>

    </Tabs>
  );
}