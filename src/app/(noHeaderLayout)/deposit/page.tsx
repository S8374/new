import DepositPage from "@/components/commonLayout/pages/Withdraw/DepositPage"
import { Suspense } from "react"

const page = () => {
  return (
    <div>
      <Suspense fallback={null}>

        <DepositPage/>
      </Suspense>

    </div>
  )
}

export default page