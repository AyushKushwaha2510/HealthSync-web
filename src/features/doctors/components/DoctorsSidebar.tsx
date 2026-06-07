'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';

type TabType = {
  label: string;
  path: string;
};

export default function DocotrSidebar({ tabs }: { tabs: TabType[] }) {
  const searchParams = useSearchParams();

  const activeSpecialization = searchParams.get('specialization');

  return (
    <aside className="fixed left-0 top-15 h-[calc(100vh-60px)] w-max min-w-72 border-r border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Doctor Directory
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Filter doctors by specialization
        </p>
      </div>

      <nav>
        <ul className="space-y-2">
          {tabs.map((tab) => {
            const specialization =
              new URLSearchParams(tab.path.split('?')[1]).get(
                'specialization'
              );

            const isActive =
              activeSpecialization === specialization ||
              (!activeSpecialization &&
                tab.path === '/admin/doctors');

            return (
              <li key={tab.path}>
                <Link
                  href={tab.path}
                  className={clsx(
                    'flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  )}
                >
                  <span>{tab.label}</span>

                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Current Filter
        </p>

        <p className="mt-1 font-medium text-slate-800 dark:text-slate-100">
          {activeSpecialization || 'All Doctors'}
        </p>
      </div>
    </aside>
  );
}