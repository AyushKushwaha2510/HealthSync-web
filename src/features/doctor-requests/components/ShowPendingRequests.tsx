'use client';

import { useEffect } from 'react';
import { useAllPendingRequests } from '../hooks/useAllPendingRequests';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ShowPendingRequests() {
  const { fetchPending, pendingRequests, loading, error } = useAllPendingRequests();

  useEffect(() => {
    fetchPending();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">
          Loading pending requests...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Doctor Registration Requests
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Review and manage doctor registration applications.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50 text-left">
              <th className="px-6 py-3 text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-sm font-semibold">
                Specialization
              </th>
              <th className="px-6 py-3 text-sm font-semibold">
                Experience
              </th>
              <th className="px-6 py-3 text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {pendingRequests?.length ? (
              pendingRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b transition hover:bg-slate-50"
                >
                  {/* ID */}
                  <td className="px-6 py-4 font-mono text-sm">
                    {request.id.slice(0, 8)}...
                  </td>

                  {/* Specialization */}
                  <td className="px-6 py-4">
                    {request.specialization}
                  </td>

                  {/* Experience */}
                  <td className="px-6 py-4">
                    {request.experience} years
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      Pending
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/doctor-requests/${request.id}`}
                      >
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          More Details
                        </Button>
                      </Link>

                      {/* <Button
                        size="sm"
                        variant="destructive"
                      >
                        Reject
                      </Button> */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-muted-foreground"
                >
                  No pending requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}