import { Suspense, lazy } from 'react'
import Loading from '@/components/Loading'
import type { RouteObject } from 'react-router-dom'

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  )

const HomePage = Loadable(lazy(() => import('@/pages/Home')))

const routes: RouteObject[] = [
  {
    path: '*',
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]

export default routes
