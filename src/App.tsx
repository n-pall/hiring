import { useState } from 'react'
import './App.css'
import questions from './fixture/questions.json'
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <MultipleChoiceQuestion questions={questions} />
      </div>
    </>
  )
}

export default App
