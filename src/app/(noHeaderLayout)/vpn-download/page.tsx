import SoftwareDownloads from "@/components/commonLayout/pages/download/SoftwareDownloads"
import { Suspense } from "react"

const page = () => {
  return (
    <div>
      <Suspense fallback={null}>

        <SoftwareDownloads/>
      </Suspense>
    </div>
  )
}

export default page