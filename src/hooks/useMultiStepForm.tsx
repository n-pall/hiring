import { useState } from 'react'

export const useMultiStepForm = (steps: number) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const nextStep = () => {
    if (currentStepIndex < steps - 1) {
      setCurrentStepIndex((i) => i + 1)
    }
  }

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1)
    }
  }

  const goTo = (index: number) => {
    setCurrentStepIndex(index)
  }

  return {
    currentStepIndex,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps - 1,
    nextStep,
    previousStep,
    goTo,
  }
}
