import styled from 'styled-components'
import { LinkBtn } from '@/common'

export default function Logo() {
  return (
    <Heading>
      <LinkBtn to="/" color="primary">
        <span className="mobile__short">TGC</span>
        <span className="desktop__long">THE GOOD CORNER</span>
      </LinkBtn>
    </Heading>
  )
}

const Heading = styled.h1`
  & .mobile__short {
    @media screen and (min-width: 720px) {
      display: none;
    }
  }
  & .desktop__long {
    display: none;
    @media screen and (min-width: 720px) {
      display: initial;
    }
  }
`
