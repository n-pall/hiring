import { Button } from './ui/button'

type Tab = {
  id: string
  text: string
}

type Props = {
  currentStepIndex: number
  goTo: (index: number) => void
  tabs: Array<Tab>
}

const SideBar: React.FC<Props> = ({ currentStepIndex, goTo, tabs }) => {
  return (
    <div className="absolute left-0 md:relative h-lvh w-fit">
      <nav className="py-5 px-4  bg-neutral-900 h-full ">
        <ul className="flex justify-center gap-2 md:flex-col">
          {tabs.map((tab, i) => (
            <li className="flex flex-col items-start font-medium" key={tab.id}>
              <Button
                variant={currentStepIndex === i ? 'secondary' : 'default'}
                onClick={() => goTo(i)}
              >
                {tab.text}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
