import React, { useEffect, useMemo, useState } from 'react'
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion'
import { useMultiStepForm } from '../hooks/useMultiStepForm'
import { Button } from '@/components/ui/button'
import SubjectiveQuestions from '@/components/SubjectiveQuestions'
import SideBar from '@/components/SideBar'
import { fetchQuestions, fetchTabs } from '../api/api'
import Loading from '@/components/Loading'

type Tabs = {
  id: string
  text: string
}

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

type FormData = {
  mcq: Array<MultipleChoiceQuestionType>
  subjective: Array<SubjectiveQuestionType>
}

const Home = () => {
  const [formQuestions, setFormData] = useState<FormData>()
  const [tabs, setTabs] = useState<Tabs[]>()

  useEffect(() => {
    fetchQuestions().then((res) => {
      setFormData(res)
    })
    fetchTabs().then((res) => {
      setTabs(res)
    })
    return () => {}
  }, [])

  const numberOfSteps = useMemo(() => {
    return tabs?.length ?? 0
  }, [tabs])

  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    steps,
  } = useMultiStepForm(numberOfSteps)

  const updateForm = (
    questions: SubjectiveQuestionType[] | MultipleChoiceQuestionType[],
    type: string
  ) => {
    setFormData((data) => {
      const updatedQuestions = {} as FormData
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

  if (!formQuestions || !tabs) return <Loading />

  const getCurrentStep = () => {
    switch (currentStepIndex) {
      case 0:
        return (
          <MultipleChoiceQuestion
            questions={formQuestions?.mcq}
            updateForm={updateForm}
          />
        )
      case 1:
        return (
          <SubjectiveQuestions
            updateForm={updateForm}
            questions={formQuestions?.subjective}
          />
        )
    }
  }

  return (
    <div className="flex flex-row">
      <div>
        <SideBar currentStepIndex={currentStepIndex} goTo={goTo} tabs={tabs} />
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
