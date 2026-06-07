'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TabType } from "@/types/sidebar-tabs.type";
import clsx from "clsx";

export default function SideBar({ tabs }: { tabs: TabType[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white p-4 fixed h-max left-4 border">
      <nav>
        <ul className="space-y-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;

            return (
              <li key={tab.path}>
                <Link
                  href={tab.path}
                  className={clsx(
                    "block rounded-md px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}