import React, { FC, ReactNode, useState } from 'react'
import { Navigate, useLocation } from 'react-router'
import Login from '@/pages/auth/Login'

type AuthGuardProps = {
  children: ReactNode
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  // const auth = useAuth() as any

  const location = useLocation()

  const [requestedLocation, setRequestedLocation] = useState<string | null>()

  // if (!auth.isAuthenticated) {
  //   if (location.pathname !== requestedLocation) {
  //     setRequestedLocation(location.pathname)
  //   }
  //   return <Login />
  // }

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null)
    return <Navigate to={requestedLocation} />
  }

  return <Login />

  return <>{children}</>
}

export default AuthGuard
