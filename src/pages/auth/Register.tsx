import React, { useRef } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '../../components/ui/password-input';
import { Button } from '@/components/ui/button';

type Props = {}

const Register: React.FC<Props> = (props: Props) => {
  const email = useRef(null)
  const password = useRef(null)
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Input placeholder="example@example.com" ref={email} />
          <PasswordInput placeholder="password" ref={password} />
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => ()}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default Register
