'use client'

import { RootState } from "@/store/store";
import { useSelector } from "react-redux"

export default function WelcomeMessage() {

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      Welcome {user?.firstName} {user?.lastName}
    </div>
  )
}