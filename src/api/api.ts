import axiosClient from './axiosClient'
import questions from '@/fixture/questions.json'

const fetchQuestions = () => {
  // axiosClient.get('/questions').then((res) => {
  //   return res
  // })

  return new Promise((resolve, reject) => {
    resolve(questions)
  })
}
