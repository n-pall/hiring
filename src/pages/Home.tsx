import React from 'react'
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion'
import questions from '@/fixture/questions.json'

const Home = () => {
  return (
    <div>
      <MultipleChoiceQuestion questions={questions} />
    </div>
  )
}

export default Home
