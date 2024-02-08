import { Typography } from './ui/typography'

const SideBar = () => {
  return (
    <div className="absolute left-0 md:relative md:top-0 md:left-0 h-lvh">
      <nav className="py-5 px-4  bg-neutral-900 h-full ">
        <ul className="flex justify-center gap-2 md:flex-col">
          <li className="flex flex-col items-start font-medium">
            <Typography variant="normal" shade="white">
              MCQ Questions
            </Typography>
          </li>
          <li className="flex flex-col items-start font-medium">
            <Typography variant="normal" shade="white">
              Subjective Questions
            </Typography>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
