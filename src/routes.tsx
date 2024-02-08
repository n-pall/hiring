import { Suspense, lazy } from 'react'
import Loading from '@/components/Loading'
import type { RouteObject } from 'react-router-dom'
import Submitted from './pages/Submitted'
import MainLayout from './layout/MainLayout'

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  )

const HomePage = Loadable(lazy(() => import('@/pages/Home')))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: 'submitted',
    element: <Submitted />,
  },
]

export default routes
