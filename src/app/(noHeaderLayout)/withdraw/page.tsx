import WithdrawPages from '@/components/commonLayout/pages/Withdraw/WithdrawPages'
import { Suspense } from 'react'

const page = () => {
  return (
    <div>
      <Suspense fallback={null}>

        <WithdrawPages/>
      </Suspense>
    </div>
  )
}

export default page