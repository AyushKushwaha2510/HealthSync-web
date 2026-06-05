'use client';

import { useEffect } from 'react';
import { useGetRequestById } from '../hooks/useGetRequestById';


export default function DetailsOfRequest() {
  const { fetchPendingById, pendingRequestById, loading, error, } = useGetRequestById();

  useEffect(() => {
    fetchPendingById();
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
    <div className="border-b px-6 py-4">
      <h2 className="text-xl font-semibold">
        Doctor Registration Request
      </h2>
    </div>

    {pendingRequestById && (
      <div className="space-y-4 p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Specialization
          </p>
          <p>{pendingRequestById.specialization}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Experience
          </p>
          <p>{pendingRequestById.experience} years</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Bio
          </p>
          <p>{pendingRequestById.hospital}</p>
        </div>
      </div>
    )}
  </div>
);
}