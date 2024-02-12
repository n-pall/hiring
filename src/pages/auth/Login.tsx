import React, { useRef } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'

type Props = {}

const Login: React.FC<Props> = (props: Props) => {
  const email = useRef(null)
  const password = useRef(null)

  const login = () => {
    console.log(email.current?.value)
    console.log(password.current?.value)
    window.location.href = '/home'
  }

  return (
    <div className="flex justify-center">
      <Card className="w-1/2 mx-5">
        <CardHeader className="place-items-center">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Input placeholder="example@example.com" ref={email} />
          <PasswordInput placeholder="password" ref={password} />
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => login()}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
