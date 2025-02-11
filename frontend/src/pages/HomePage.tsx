import { Suspense } from 'react'
import { Loader } from '@/common'
import { RecentAds } from '@/components'
import { PageContent } from '@/layouts'

export default function HomePage() {
  return (
    <PageContent title="Recent Ads">
      <Suspense fallback={<Loader $center size="lg" />}>
        <RecentAds />
      </Suspense>
    </PageContent>
  )
}
