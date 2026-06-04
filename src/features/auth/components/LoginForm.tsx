'use client';

import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm() {
  const { login, loading } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    login(email, password);
  };

  return (
    <div className="flex flex-col gap-5 text-center items-center mt-10 ">
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />

      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>{loading ? 'Loading...' : 'Login'}</button>
    </div>
  );
}
