'use client';

import { useEffect, useState } from 'react';
import { useGetRequestById } from '../hooks/useGetRequestById';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DoctorRequestDto, Status } from '../types/register-doctor.dto';
import { Input } from '@/components/ui/input';
import { useUpdateStatus } from '../hooks/useUpdateStatus';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';


export default function DetailsOfRequest() {

  const {
    fetchPendingById,
    pendingRequestById,
    loading: fetchLoading,
    error: fetchError,
  } = useGetRequestById();

  const [response, setResponse] = useState<Partial<DoctorRequestDto>>({})

  const {
    updateRequestStatus,
    loading: updateLoading,
    error: updateError,
    success,
  } = useUpdateStatus();

  useEffect(() => {
    fetchPendingById();
  }, []);

  useEffect(() => {
    if (pendingRequestById) {
      setResponse(pendingRequestById);
    }
  }, [pendingRequestById]);

  console.log('respnse, init', response)

  if (fetchLoading) {
    return (
      <Loading message='Loading pending requests...' />
    );
  }

  if (fetchError) {
    return (
      <ErrorMessage message={fetchError} />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Doctor Registration Request
        </h2>
        <p className="text-sm text-muted-foreground">
          Review doctor information before approval.
        </p>
      </div>

      {pendingRequestById && (
        <div className='p-6 space-y-5'>
          <div className="grid gap-6 md:grid-cols-2 pb-4 border-b">

            {/* Doctor Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                Professional Information
              </h3>

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
                  Hospital
                </p>
                <p>{pendingRequestById.hospital}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  License Number
                </p>
                <p>{pendingRequestById.licenseNumber}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Status
                </p>

                <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                  {pendingRequestById.status}
                </span>
              </div>
            </div>

            {/* User Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                Personal Information
              </h3>

              <div>
                <p className="text-sm text-muted-foreground">
                  Full Name
                </p>
                <p>
                  {pendingRequestById.user.firstName}{' '}
                  {pendingRequestById.user.lastName}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>
                <p>{pendingRequestById.user.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Date of Birth
                </p>
                <p>{pendingRequestById.user.dob}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Gender
                </p>
                <p>{pendingRequestById.user.gender}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Blood Group
                </p>
                <p>{pendingRequestById.user.bloodGroup}</p>
              </div>
            </div>
          </div>

          {/* Update Status */}
          <div className='flex gap-3'>
            <div className="space-y-2">
              <Label>Update Status</Label>

              <Select
                onValueChange={(value) =>
                  setResponse((prev) => ({
                    ...prev,
                    status: value as DoctorRequestDto['status'],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={Status.APPROVED}>
                    Approve
                  </SelectItem>

                  <SelectItem value={Status.REJECTED}>
                    Reject
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {response.status === Status.REJECTED && (
              <div className="flex-1 space-y-2">
                <Label>Rejection Reason</Label>

                <Input
                  placeholder="Enter reason for rejection"
                  value={response.rejectionReason || ''}
                  onChange={(e) =>
                    setResponse((prev) => ({
                      ...prev,
                      rejectionReason: e.target.value,
                    }))
                  }
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                console.log('response', response)
                updateRequestStatus(response)
              }}
            >
              Update Request
            </Button>
          </div>

          {
            success && <SuccessMessage message={success} />
          }

        </div>
      )}
    </div>
  );
}