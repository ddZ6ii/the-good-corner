import { Suspense } from "react";
import Loader from "@/common/Loader";
import RecentAds from "@/components/RecentAds";
import PageContent from "@/layouts/PageContent";

export default function HomePage() {
  return (
    <PageContent title="Recent Ads">
      <Suspense fallback={<Loader $center size="lg" />}>
        <RecentAds />
      </Suspense>
    </PageContent>
  );
}
