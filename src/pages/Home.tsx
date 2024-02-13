import React, { useEffect, useMemo, useRef, useState } from 'react'
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion'
import { useMultiStepForm } from '../hooks/useMultiStepForm'
import SubjectiveQuestions from '@/components/SubjectiveQuestions'
import SideBar from '@/components/SideBar'
import { fetchQuestions, fetchTabs, submitForm } from '@/api/api'
import Loading from '@/components/Loading'
import TaskFooter from '@/components/TaskFooter'
import { Separator } from '@/components/ui/separator'

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
      submitForm(formQuestions)
        .then(() => {
          // window.location.href = 'submitted'
        })
        .catch((err) => {
          console.log(err)
        })
      return
    }

    nextStep()
  }

  const questionsCount = useMemo(() => {
    const mcqLength = formQuestions?.mcq.length
    const subjectiveLength = formQuestions?.subjective.length
    return (
      (mcqLength ? mcqLength : 0) + (subjectiveLength ? subjectiveLength : 0)
    )
  }, [formQuestions])

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
      <div className="">
        <SideBar
          currentStepIndex={currentStepIndex}
          goTo={goTo}
          tabs={tabs.current}
          questionsCount={questionsCount}
        />
      </div>
      <div className="px-4 w-full flex flex-col justify-between h-screen overflow-hidden">
        <div className="overflow-y-scroll">{getCurrentStep()}</div>
        <div className="relative">
          <Separator />
          <TaskFooter
            showBack={!isFirstStep}
            onBack={previousStep}
            onNext={handleNext}
            nextButtonText={isLastStep ? 'Submit' : 'Next'}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
