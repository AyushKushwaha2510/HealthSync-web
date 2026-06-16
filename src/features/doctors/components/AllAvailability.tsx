'use client'

import { useViewAvailability } from "../hooks/useViewAvailability";
import { useEffect } from "react";

export default function AllAvailability() {

  const { viewAvailability, availabilites, loading, success, error } = useViewAvailability();

  useEffect(()=>{
    viewAvailability();
  },[])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Doctor Availability
      </h2>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full border-collapse bg-white text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Doctor</th>
              <th className="p-3 border">Specialization</th>
              <th className="p-3 border">Weekday</th>
              <th className="p-3 border">Time Slot</th>
              <th className="p-3 border">Duration</th>
              <th className="p-3 border">Hospital</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Phone</th>
            </tr>
          </thead>

          <tbody>
            {availabilites?.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Doctor */}
                <td className="p-3 border font-medium">
                  Dr. {item.doctor.id.slice(0, 6)}
                </td>

                {/* Specialization */}
                <td className="p-3 border">
                  {item.doctor.specialization}
                </td>

                {/* Weekday */}
                <td className="p-3 border capitalize">
                  {item.weekday}
                </td>

                {/* Time */}
                <td className="p-3 border">
                  {item.startTime} - {item.endTime}
                </td>

                {/* Duration */}
                <td className="p-3 border">
                  {item.slotDuration} min
                </td>

                {/* Hospital */}
                <td className="p-3 border">
                  {item.hospital?.name ?? "—"}
                </td>

                {/* Location */}
                <td className="p-3 border text-gray-600">
                  {item.hospital?.address
                    ? `${item.hospital.address.city}, ${item.hospital.address.state}`
                    : "—"}
                </td>

                {/* Phone */}
                <td className="p-3 border text-gray-600">
                  {item.hospital?.phone ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}