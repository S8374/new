import RedPacketPage from "@/components/components/RedPacketPage"
import { Suspense } from "react"

const page = () => {
  return (
    <div>
      <Suspense fallback={null}>

        <RedPacketPage/>
      </Suspense>
    </div>
  )
}

export default page