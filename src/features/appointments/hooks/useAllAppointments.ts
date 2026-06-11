import { useState } from "react";
import { Appointment } from "../types/appointment.type";
import { getAllAppointmentsApi } from "../api/appointment.api";

export const useAllAppointments = () => {

  const [appointments, setAppointments] = useState<Appointment[] | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchAllAppointments = async () => {

    try {
      setLoading(true);
      setError(null);

      console.log('res')
      const res = await getAllAppointmentsApi();
      console.log('res', res)
      setAppointments(res.data)
      setSuccess(res.message);

      return res;
    }
    catch (error: any) {
      setSuccess(null);
      setError(
        error.response?.data?.message ||
        'Failed to Find Appointment'
      );
    }
    finally {
      setLoading(false);
    }
  };

  return { fetchAllAppointments, appointments, loading, error, success };

};