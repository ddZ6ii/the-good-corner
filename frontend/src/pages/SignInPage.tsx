import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { SignForm } from '@/components'
import { LOG_IN } from '@/graphql/logIn'
import { WHO_AM_I } from '@/graphql/whoAmI'
import { PageContent } from '@/layouts'
import { SignInSchema } from '@/schemas'
import { SignInFormData } from '@/types'
import { notifySuccess } from '@/utils'

/*
  Test config.
  ----------------------
  const initialFormData = {
    email: "test@email.com",
    password: "My-Super-Password-123",
  };
 */

const initialFormData: SignInFormData = {
  email: '',
  password: '',
}

export default function SignInPage() {
  const navigate = useNavigate()
  const [logIn] = useMutation(LOG_IN)

  const logInUser = async (formData: SignInFormData) => {
    const parsedBody = SignInSchema.parse(formData)
    const { data, errors } = await logIn({
      variables: { data: parsedBody },
      refetchQueries: [{ query: WHO_AM_I }],
    })
    if (errors !== undefined || !data?.logInUser) {
      if (errors) console.error('Failed to sign in:', errors)
      throw new Error('Failed to sign in!')
    }
    notifySuccess('Glad to have you back 👋')
    setTimeout(() => {
      navigate('/', { replace: true })
    }, 3000)
  }

  return (
    <PageContent title="Sign In">
      <SignForm
        type="signIn"
        initialFormData={initialFormData}
        onSubmit={logInUser}
      />
    </PageContent>
  )
}
