import styled from 'styled-components'
import { useMemo } from 'react'
import { useSuspenseQuery } from '@apollo/client'
import { NavLink } from '@/common'
import { GET_CATEGORIES } from '@/graphql/categories'
import { theme } from '@/themes'
import { capitalize } from '@/utils'

export default function Navbar() {
  const { data: { categories = [] } = {}, error } =
    useSuspenseQuery(GET_CATEGORIES)

  const sortedCategories = useMemo(
    () =>
      [...categories].sort((cat1, cat2) => cat1.name.localeCompare(cat2.name)),
    [categories],
  )

  if (error) {
    console.error(error)
    return <p>No categories currently available...</p>
  }

  return (
    <nav>
      <NavList>
        {sortedCategories.map((category) => (
          <li key={category.id}>
            <NavLink to={`categories/${category.id.toString()}`}>
              {capitalize(category.name)}
            </NavLink>
          </li>
        ))}
      </NavList>
    </nav>
  )
}

const NavList = styled.ul`
  padding: 16px 10px 6px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 12px;
  font-weight: bold;
  color: ${theme.color.neutral.light};
  white-space: nowrap;
  overflow-x: auto;
  & li {
    margin-bottom: 4px;
  }
  @media screen and (min-width: 720px) {
    padding-top: 14px;
  }
`
