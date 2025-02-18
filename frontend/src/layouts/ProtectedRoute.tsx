import { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Loader, Modal } from '@/common'
import { UserRole } from '@/gql/graphql'
import { WHO_AM_I } from '@/graphql/whoAmI'
import { AuthStatus } from '@/types'

interface ProtectedRouteProps {
  authStates: AuthStatus[]
  redirectPath?: string
  children?: ReactNode
}

/*
  User authentication status
  --------------------------
 
  user is `undefined` => uncertain state: user authentication status is not known yet (waiting for the server response)

  user is `null` => user is not authenticated (server responded with null)
 
  user is `User` => user is authenticated (server responded with user data)
 
 */
export default function ProtectedRoute({
  authStates,
  redirectPath = '/',
  children,
}: ProtectedRouteProps) {
  const { data: { whoAmI: user } = {} } = useQuery(WHO_AM_I)

  if (user === undefined) {
    return (
      <Modal open hideCloseButton $transparent closeOnEscape={false}>
        <Loader $center size="lg" />
      </Modal>
    )
  }

  const isAllowed =
    (user === null && authStates.includes(AuthStatus.UNAUTHENTICATED)) ||
    (!!user && authStates.includes(AuthStatus.USER)) ||
    (!!user &&
      user.role === UserRole.Admin &&
      authStates.includes(AuthStatus.ADMIN))

  if (isAllowed) {
    return children ? children : <Outlet />
  }

  return <Navigate to={redirectPath} replace />
}
