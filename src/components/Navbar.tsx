'use client'

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/features/auth/store/auth.slice';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function Navbar() {

  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const router = useRouter();
console.log("user", user)
  const handleLogout = () => {
    localStorage.removeItem('token');

    dispatch(logout());

    router.push('/login');
  };

  return (
    <nav className="border-b bg-white fixed w-full z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">HealthSync</span>
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-2 p-4">
                  <NavigationMenuLink asChild>
                    <Link href="/appointments">
                      Book Appointment
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/doctors">
                      Find Doctors
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/specialities">
                      Medical Specialities
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/telemedicine">
                      Online Consultation
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/doctors"
                  className="group inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-slate-100"
                >
                  Doctors
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/appointments"
                  className="group inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-slate-100"
                >
                  Appointments
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className="group inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-slate-100"
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className='flex space-x-2 items-center'>
              <p>
                Hi, {user.firstName}
              </p>
            <Button
              className='rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-slate-50'
              variant="destructive"
              onClick={handleLogout}
            >
              Logout
            </Button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}