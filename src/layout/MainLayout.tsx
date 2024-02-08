import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '@/components/SideBar'

type MainLayoutProps = {
  children?: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="px-4 w-full">{children || <Outlet />}</div>
    </div>
  )
}

export default MainLayout
