import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type MainLayoutProps = {
  children?: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <div>{children || <Outlet />}</div>
}

export default MainLayout
