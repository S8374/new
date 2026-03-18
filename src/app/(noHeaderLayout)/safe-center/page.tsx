import { Suspense } from "react";
import SafeCenter from "@/components/commonLayout/pages/account/SafeCenter";

const page = () => {
  return (
    <Suspense fallback={null}>
      <SafeCenter />
    </Suspense>
  );
};

export default page;