import React, { useState } from 'react'
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion'
import questions from '@/fixture/questions.json'
import { useMultiStepForm } from '../hooks/useMultiStepForm'
import { Button } from '@/components/ui/button'
import SubjectiveQuestions from '@/components/SubjectiveQuestions'
import SideBar from '@/components/SideBar'

type Choice = {
  id: string
  label: string
  value: string | undefined
}

type MultipleChoiceQuestionType = {
  id: string
  text: string
  choices: Array<Choice>
  answer: string | undefined
  selected: string | null | undefined
}

type SubjectiveQuestionType = {
  id: string
  text: string
  answer: string | undefined
}
const Home = () => {
  const [formData, setFormData] = useState<[]>([])
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    steps,
  } = useMultiStepForm(2)

  const updateForm = (
    questions: SubjectiveQuestionType[] | MultipleChoiceQuestionType[],
    type: string
  ) => {
    setFormData((data) => {
      const updatedQuestions = {}
      updatedQuestions[type] = [...questions]
      return { ...data, ...updatedQuestions }
    })
  }

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isLastStep) {
      // TODO API call to submit form
      window.location.href = 'submitted'
      return
    }

    nextStep()
  }

  const getCurrentStep = () => {
    switch (currentStepIndex) {
      case 0:
        return (
          <MultipleChoiceQuestion
            questions={questions.mcq}
            updateForm={updateForm}
          />
        )
      case 1:
        return (
          <SubjectiveQuestions
            updateForm={updateForm}
            questions={questions.subjective}
          />
        )
    }
  }

  return (
    <div className="flex flex-row">
      <div>
        <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
      </div>
      <div className="px-4 w-full">
        <div>{getCurrentStep()}</div>
        <div className="flex flex-row gap-5 py-3">
          {!isFirstStep && <Button onClick={previousStep}>Back</Button>}
          <Button onClick={handleNext}>{isLastStep ? 'Submit' : 'Next'}</Button>
        </div>
      </div>
    </div>
  )
}

export default Home
