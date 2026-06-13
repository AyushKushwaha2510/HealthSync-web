'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TabType } from "@/types/sidebar-tabs.type";
import clsx from "clsx";

export default function SideBar({ tabs }: { tabs: TabType[] }) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "w-56 shrink-0 fixed left-0 top-15 h-[calc(100vh-60px)] flex flex-col py-6 px-3 z-40 transition-colors duration-300",
        // Light mode
        "bg-white border-r border-slate-200",
        // Dark mode
        "dark:bg-[#0b1120] dark:border-white/[0.06]"
      )}
    >
      {/* Brand / Logo */}
      <div className="px-3 mb-8 flex items-center gap-2.5">
        {/* Pulse icon — medical feel */}
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/10 dark:bg-teal-400/10">
          <svg className="w-4 h-4 text-teal-500 dark:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </span>
        <span className="text-sm font-semibold tracking-wide text-slate-800 dark:text-white/90">
          HealthSync
        </span>
      </div>

      {/* Section label */}
      <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25">
        Navigation
      </p>

      {/* Nav links */}
      <nav className="flex-1">
        <ul className="space-y-0.5">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;

            return (
              <li key={tab.path}>
                <Link
                  href={tab.path}
                  className={clsx(
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    isActive
                      // Light active
                      ? "bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300"
                      // Light inactive
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-white/40 dark:hover:bg-white/[0.05] dark:hover:text-white/75"
                  )}
                >
                  {/* Active pill */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-teal-500 dark:bg-teal-400" />
                  )}

                  {/* Icon slot */}
                  {(tab as any).icon && (
                    <span
                      className={clsx(
                        "shrink-0 w-4 h-4 transition-colors",
                        isActive
                          ? "text-teal-500 dark:text-teal-400"
                          : "text-slate-400 group-hover:text-slate-600 dark:text-white/25 dark:group-hover:text-white/55"
                      )}
                    >
                      {(tab as any).icon}
                    </span>
                  )}

                  <span className="truncate">{tab.label}</span>

                  {/* Badge slot */}
                  {(tab as any).badge != null && (
                    <span
                      className={clsx(
                        "ml-auto text-[10px] font-semibold rounded-full px-1.5 py-0.5 tabular-nums leading-none",
                        isActive
                          ? "bg-teal-100 text-teal-600 dark:bg-teal-400/20 dark:text-teal-300"
                          : "bg-slate-100 text-slate-400 dark:bg-white/[0.07] dark:text-white/35"
                      )}
                    >
                      {(tab as any).badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <p className="text-[11px] text-slate-400 dark:text-white/25 tracking-wide">
            System Online
          </p>
        </div>
      </div>
    </aside>
  );
}