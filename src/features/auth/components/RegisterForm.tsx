'use client';

import { useState, useEffect } from 'react';
import { useRegister } from '../hooks/useRegister';
import { RegisterUserDto } from '../types/register.dto';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function RegisterForm() {
  const {
    register,
    loading, success, error,
    sendMailOtp,
    isOtpSent,
    verifyMailOtp,
    isOtpVerified
  } = useRegister();

  const [form, setForm] = useState<RegisterUserDto>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    bloodGroup: undefined,
    gender: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await register(form);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false); // state for opening OTP box

  const [otp, setOtp] = useState<string | null>(null);

  // Open OTP box
  useEffect(() => {
    if (isOtpSent) {
      setIsOpen(true);
    }
  }, [isOtpSent]);

  return (
    <div className="flex items-center justify-center p-6">
      <Card className="w-full max-w-lg border-0 shadow-2xl">
        {/* <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">
            Create Account
          </CardTitle>

          <CardDescription>
            Join our healthcare platform today
          </CardDescription>
        </CardHeader> */}

        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                name="firstName"
                placeholder="John"
                onChange={handleChange}
              />
            </div>
            {/* Last Name */}
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                name="lastName"
                placeholder="Doe"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            {/* DOB */}
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input name="dob" type="date" onChange={handleChange} />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>

              <Select
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    gender: value as RegisterUserDto['gender'],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Blood Group */}
          <div className="space-y-2">
            <Label>Blood Group</Label>
            <Input
              name="bloodGroup"
              placeholder="e.g. O+, A-"
              onChange={handleChange}
            />
          </div>

          <Button
            className="h-11 w-full bg-teal-500 text-white hover:bg-teal-600"
            onClick={() => {
              // send mail to otp
              sendMailOtp({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email
              })
            }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </Button>

          {/* OTP */}
          {isOpen && (
            <div>
              <Input
                type="number"
                value={otp ?? undefined}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                disabled={otp === null}
                onClick={() => {
                  if (otp !== null) {
                    verifyMailOtp({
                      email: form.email,
                      otp: Number(otp)
                    });
                  }
                }}
              >
                Verify
              </Button>
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              {Array.isArray(error) ? (
                <ul className="list-disc space-y-1 pl-5 text-sm text-red-600">
                  {error.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
