import React, { ChangeEvent } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'

type SubjectiveQuestion = {
  id: string
  text: string
  answer: string | undefined
}
type Props = {
  questions: Array<SubjectiveQuestion>
  updateForm: (questions: Array<SubjectiveQuestion>, type: string) => void
}

const SubjectiveQuestions: React.FC<Props> = ({ questions, updateForm }) => {
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newQuestions = [...questions]
    newQuestions[index].answer = event?.target?.value ?? undefined
    updateForm(newQuestions as SubjectiveQuestion[], 'subjective')
  }

  return (
    <>
      {questions.map((question, index) => (
        <div key={question.id} className="py-5">
          <Typography variant="normal">
            {index + 1}. {question.text}
          </Typography>
          <Textarea
            value={question.answer}
            onChange={(e) => {
              handleChange(e, index)
            }}
          />
        </div>
      ))}
    </>
  )
}

export default SubjectiveQuestions
