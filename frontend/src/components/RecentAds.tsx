import { useMemo } from 'react'
import { useSuspenseQuery } from '@apollo/client'
import { AdList } from '@/components'
import { GET_ADS } from '@/graphql/ads'
import { sortAdsByCreationDate } from '@/utils'

export default function RecentAds() {
  const { data: { ads = [] } = {}, error } = useSuspenseQuery(GET_ADS)

  const sortedAds = useMemo(() => sortAdsByCreationDate(ads), [ads])

  if (error) {
    console.error(error)
    return <p>No ads currently available...</p>
  }

  return <AdList ads={sortedAds} />
}
