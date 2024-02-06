import React from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Typography } from '@/components/ui/typography'

type Props = {
  questions: Array<any>
}

const MultipleChoiceQuestion: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props.questions.map((question, index) => (
        <div className="my-6 py-5">
          <div>
            <Typography variant="normal">
              {index + 1}. {question.text}
            </Typography>
          </div>
          <RadioGroup
            defaultValue="option-one"
            className="grid grid-cols-2 gap-4"
          >
            {question.choices.map((choice: any) => (
              <div className="flex flex-row items-center gap-2" key={choice.id}>
                <RadioGroupItem value={choice.value} id={choice.id} />
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
