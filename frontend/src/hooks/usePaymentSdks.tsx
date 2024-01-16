import { useState, useEffect, useMemo } from "react";
import api from "../services/api";

export default function usePaymentSdks() {
  const [sdkReady, setSdkReady] = useState({
    paypal: false,
  });

  const isReady = useMemo(
    () => Object.keys(sdkReady).every((key) => (sdkReady as any)[key]),
    [sdkReady]
  );

  useEffect(() => {
    const addPaypalScript = async () => {
      /*const {
        data: { paypal },
      } = await api.get("/checkout/config");*/

      const script = document.createElement("script");

      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${"test"}`;
      script.async = true;
      script.onload = () => setSdkReady({ ...sdkReady, paypal: true });

      document.body.appendChild(script);
    };

    addPaypalScript();
  }, []);

  return [isReady];
}
