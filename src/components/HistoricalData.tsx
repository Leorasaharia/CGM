const errorData = {
  code: "rate-limited",
  message: "You have hit the rate limit. Please upgrade to keep chatting.",
  providerLimitHit: false,
  isRetryable: true,
};

export function HistoricalData() {
  return (
    <div>
      <h2>Error</h2>
      <p>{errorData.message}</p>
    </div>
  );
}
