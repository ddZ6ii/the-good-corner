import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Loader } from '@/common'
import {
  Ad,
  AdActions,
  AdContent,
  AdPrice,
  AdTags,
  AdThumbnail,
  AdTitle,
} from '@/components/ad'
import { GET_AD } from '@/graphql/ad'
import { IdInput } from '@/gql/graphql'
import { PageContent } from '@/layouts'
import { IdParamSchema } from '@/schemas'
import { basePillStyle } from '@/styles'
import { theme } from '@/themes'
import { capitalize, formatPriceWithCurrency } from '@/utils'

export default function AdPage() {
  const params = useParams<IdInput>()
  const { id } = IdParamSchema.parse(params)
  const {
    data: { ad } = {},
    error,
    loading,
  } = useQuery(GET_AD, {
    variables: { id },
    skip: !id,
  })

  if (loading) {
    return <Loader $center size="lg" />
  }

  if (error || !ad) {
    if (error) console.error(error)
    return <p>No ad found!</p>
  }

  return (
    <PageContent title={capitalize(ad.title)}>
      <Ad>
        <AdActions id={ad.id} />
        <AdThumbnail alt={ad.title} src={ad.picture} />
        <AdContent>
          <AdCategory>{ad.category.name}</AdCategory>
          <AdTitle title={ad.title}>{ad.title}</AdTitle>
          <AdPrice>{formatPriceWithCurrency(ad.price)}</AdPrice>
          <AdDescription>{ad.description}</AdDescription>
          {ad.tags != null && <AdTags tags={ad.tags ?? []} />}
          <AdAuthor>Created by: {ad.createdBy?.email}</AdAuthor>
        </AdContent>
      </Ad>
    </PageContent>
  )
}

const AdCategory = styled.p`
  ${basePillStyle}
`

const BaseText = styled.p`
  color: ${theme.color.neutral.light};
  font-size: 16px;
`

const AdDescription = styled(BaseText)``

const AdAuthor = styled(BaseText)``
