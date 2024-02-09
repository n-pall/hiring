import React from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Typography } from '@/components/ui/typography'

type Choice = {
  id: string
  label: string
  value: string | undefined
}

type MultipleChoiceQuestion = {
  id: string
  text: string
  choices: Array<Choice>
  answer: string | undefined
  selected: string | null | undefined
}

type Props = {
  questions: Array<MultipleChoiceQuestion>
  updateForm: (questions: Array<MultipleChoiceQuestion>, type: string) => void
}

const MultipleChoiceQuestion: React.FC<Props> = ({ questions, updateForm }) => {
  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined,
    index: number
  ) => {
    const newQuestions = [...questions]
    newQuestions[index].selected = event?.target?.value
    updateForm(newQuestions as MultipleChoiceQuestion[], 'mcq')
  }

  return (
    <>
      {questions.map((question, index) => (
        <div className="my-6 py-5" key={question.id}>
          <div>
            <Typography variant="normal">
              {index + 1}. {question.text}
            </Typography>
          </div>
          <RadioGroup
            className="grid grid-cols-2 gap-4"
            defaultValue={question.selected}
          >
            {question.choices.map((choice) => (
              <div className="flex flex-row items-center gap-2" key={choice.id}>
                <RadioGroupItem
                  value={choice.value}
                  id={choice.id}
                  onClick={(e) => {
                    handleChange(e, index)
                  }}
                />
                <Label htmlFor={choice.value}>{choice.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </>
  )
}

export default MultipleChoiceQuestion
