import React, { useState } from 'react'
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion'
import questions from '@/fixture/questions.json'
import { useMultiStepForm } from '../hooks/useMultiStepForm'
import { Button } from '@/components/ui/button'
import SubjectiveQuestions from '@/components/SubjectiveQuestions'

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
  const [formData, setFormData] = useState<[] | undefined>()

  const updateForm = (
    questions: SubjectiveQuestionType[] | MultipleChoiceQuestionType[]
  ) => {
    // setFormData((data) => [...data, questions])
    console.log(questions)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // TODO API call to submit form

    // window.location.href = 'submitted'
  }

  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    steps,
  } = useMultiStepForm(2)

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
    <div>
      <div>{getCurrentStep()}</div>
      <div className="flex flex-row gap-5 py-3">
        {!isFirstStep && <Button onClick={previousStep}>Back</Button>}
        <Button onClick={nextStep}>{isLastStep ? 'Submit' : 'Next'}</Button>
      </div>
    </div>
  )
}

export default Home
