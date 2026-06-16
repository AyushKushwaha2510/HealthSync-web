"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "inline-flex w-fit items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-900",
  {
    variants: {
      variant: {
        default: "",
        line: "bg-transparent border-b rounded-none p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        `
        relative inline-flex items-center justify-center
        rounded-lg px-5 py-2.5
        text-sm font-medium
        transition-all duration-200

        text-slate-600
        hover:text-teal-600
        hover:bg-teal-50

        dark:text-slate-400
        dark:hover:text-teal-400
        dark:hover:bg-slate-800

        data-active:bg-white
        data-active:text-teal-600
        data-active:shadow-md
        data-active:border

        dark:data-active:bg-slate-950
        dark:data-active:text-teal-400
        dark:data-active:border-slate-800

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-teal-400/40

        disabled:pointer-events-none
        disabled:opacity-50
        `,
        className
      )}
      {...props}
    />
  );
}
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
