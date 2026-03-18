import PromotionSection from "@/components/commonLayout/pages/promotion/Promotion"
import { Suspense } from "react"

const page = () => {
  return (
    <div>
      <Suspense fallback={null}>

        <PromotionSection/>
      </Suspense>
    </div>
  )
}

export default page