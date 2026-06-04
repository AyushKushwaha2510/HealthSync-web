'use client';

import { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const { login, loading, error, success, user } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    login(email, password);
  };

  const router = useRouter()
  const role = user?.role

  useEffect(() => {
    if (!user) return; // Wait until the user object actually exists

    if (user.role === 'admin') {
      router.push('/admin/dashboard');
    } else if (user.role === 'doctor') {
      router.push('/doctor/dashboard');
    } else if (user.role === 'patient') {
      router.push('/patient/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center p-6">
      <Card className="w-full max-w-lg border-0 shadow-2xl">

        <CardContent className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            className="h-11 w-full bg-teal-500 text-white hover:bg-teal-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Loggin In...' : 'Log In'}
          </Button>

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
