import React from "react";

const errorData = {
  code: "rate-limited",
  message: "You have hit the rate limit. Please upgrade to keep chatting.",
  providerLimitHit: false,
  isRetryable: true,
};

export function GlucoseMonitor() {
  return (
    <div>
      <h2>{errorData.code}</h2>
      <p>{errorData.message}</p>
    </div>
  );
}
