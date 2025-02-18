import styled from 'styled-components'
import { LinkBtn } from '@/common'
import { PageContent } from '@/layouts'

export default function SignOutPage() {
  return (
    <PageContent title="Goodbye for now!">
      <Container>
        <Text>You&apos;ve successfully signed out on this device.</Text>
        <Text>
          Sign back in anytime to get access to our most recents ads and your
          saved searches on your account.
        </Text>
        <LinkBtn to="/signin" replace variant="filled" color="primary">
          Sign back in
        </LinkBtn>
      </Container>
    </PageContent>
  )
}

const Container = styled.div`
  max-width: 600px;
  margin-inline: auto;
  display: grid;
  gap: 1rem;
  & a {
    margin-inline: auto;
    width: fit-content;
  }
`

const Text = styled.p`
  line-height: 1.5;
`
