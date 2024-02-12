import React from 'react'
import { Button } from './ui/button'
import { Typography } from './ui/typography'
import { Separator } from './ui/separator'
import { NavigationMenu, NavigationMenuList } from './ui/navigation-menu'

type Tab = {
  id: string
  text: string
}

type Props = {
  currentStepIndex: number
  goTo: (index: number) => void
  tabs: Array<Tab>
  questionsCount?: number
  attemptedCount?: number
}

const SideBar: React.FC<Props> = ({
  currentStepIndex,
  goTo,
  tabs,
  questionsCount,
  attemptedCount,
}) => {
  return (
    <div className="absolute left-0 md:relative w-fit h-full">
      <NavigationMenu
        orientation="vertical"
        className="bg-neutral-900 h-full py-5 px-4 items-start"
      >
        <div className="">
          <div>
            <Typography shade="white">
              Attempted: {attemptedCount ?? 0}
            </Typography>
            {questionsCount && (
              <Typography shade="white">
                Total Questions: {questionsCount}
              </Typography>
            )}
          </div>
          <ul className="flex justify-center md:flex-col">
            {tabs.map((tab, i) => (
              <div key={tab.id}>
                <li className="flex flex-col items-start font-medium">
                  <Button
                    variant={currentStepIndex === i ? 'secondary' : 'default'}
                    className="w-full rounded-none"
                    onClick={() => goTo(i)}
                  >
                    {tab.text}
                  </Button>
                </li>
                <Separator orientation="horizontal" />
              </div>
            ))}
          </ul>
        </div>
      </NavigationMenu>
    </div>
  )
}

export default SideBar
