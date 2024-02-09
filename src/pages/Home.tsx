import React, { useEffect, useMemo, useRef, useState } from 'react'
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion'
import { useMultiStepForm } from '../hooks/useMultiStepForm'
import { Button } from '@/components/ui/button'
import SubjectiveQuestions from '@/components/SubjectiveQuestions'
import SideBar from '@/components/SideBar'
import { fetchQuestions, fetchTabs, submitForm } from '@/api/api'
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

type Questions = {
  mcq: Array<MultipleChoiceQuestionType>
  subjective: Array<SubjectiveQuestionType>
}

const Home = () => {
  const [formQuestions, setFormData] = useState<Questions>()
  const tabs = useRef<Tabs[]>([])

  useEffect(() => {
    fetchQuestions().then((res) => {
      setFormData(res)
    })
    fetchTabs().then((res) => {
      // setTabs(res)
      tabs.current = [...res]
    })
    return () => {}
  }, [])

  const numberOfSteps = useMemo(() => {
    return tabs.current.length
  }, [tabs.current])

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
    questions: MultipleChoiceQuestionType[] | SubjectiveQuestionType[],
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
      submitForm(formQuestions).then(() => {
        // window.location.href = 'submitted'
      })
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
        <SideBar
          currentStepIndex={currentStepIndex}
          goTo={goTo}
          tabs={tabs.current}
        />
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
