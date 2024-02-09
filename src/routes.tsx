import { Suspense, lazy } from 'react'
import Loading from '@/components/Loading'
import type { RouteObject } from 'react-router-dom'
import Submitted from '@/pages/Submitted'
import MainLayout from '@/layout/MainLayout'
import AuthGuard from '@/guards/AuthGuard'

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  )

const Login = Loadable(lazy(() => import('@/pages/auth/Login')))
const Register = Loadable(lazy(() => import('@/pages/auth/Register')))

const HomePage = Loadable(lazy(() => import('@/pages/Home')))

const routes: RouteObject[] = [
  {
    path: '/authentication',
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: 'submitted',
    element: <Submitted />,
  },
]

export default routes
