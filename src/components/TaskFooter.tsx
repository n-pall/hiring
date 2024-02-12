import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  showBack?: boolean
  onBack?: () => void
  onNext?: (e: React.MouseEvent<HTMLButtonElement>) => void
  nextButtonText?: string
}

const TaskFooter: React.FC<Props> = ({
  showBack,
  onBack,
  onNext,
  nextButtonText,
}) => {
  return (
    <div className="flex flex-row gap-5 py-3">
      {showBack && <Button onClick={onBack}>Back</Button>}
      <Button onClick={onNext}>{nextButtonText || 'Next'}</Button>
    </div>
  )
}

export default TaskFooter
