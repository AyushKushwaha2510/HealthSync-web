import RegisterForm from '@/features/auth/components/RegisterForm';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side */}
      <section className="relative hidden lg:block flex-1">
        <Image
          src="/image/login.jpg"
          alt="Healthcare"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <span className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            Healthcare Management System
          </span>

          <h1 className="mb-4 max-w-xl text-5xl font-bold leading-tight">
            Your Health,
            <br />
            Connected & Secure.
          </h1>

          <p className="max-w-lg text-lg text-slate-200">
            Book appointments, manage medical records, connect with trusted
            doctors, and access healthcare services from anywhere.
          </p>
        </div>
      </section>

      {/* Right Side */}
      <main className="flex flex-1 items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Create Account
            </h2>
            <p className="mt-2 text-slate-500">
              Join our healthcare platform today.
            </p>
          </div>

          <RegisterForm />
        </div>
      </main>
    </div>
  );
}