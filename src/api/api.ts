import axiosClient from './axiosClient'
import questions from '@/fixture/questions.json'
import tabs from '@/fixture/tabs.json'

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

type Tabs = {
  id: string
  text: string
}

const fetchQuestions = async () => {
  // let questions = {}
  // return await axiosClient.get('/questions')
  // .then((res) => {
  //   questions = {...res.data}
  // })
  // .then((err) => {
  //   console.error(err)
  // })

  return questions as Questions
}

const fetchTabs = async () => {
  // let tabs = {}
  // return await axiosClient.get('/tabs')
  // .then((res) => {
  //   tabs = [...res.data]
  // })
  // .then((err) => {
  //   console.error(err)
  // })
  return tabs as Tabs[]
}

const submitForm = async (questions: Questions | undefined) => {
  await axiosClient
    .post('/examination', { payload: questions })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
}

export { fetchQuestions, fetchTabs, submitForm }
