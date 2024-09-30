import React, { useState } from "react";
import ReactDOM from "react-dom";

const DomainChecker = () => {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkDomain = async () => {
    if (!domain) return;
    setLoading(true);

    try {
      const response = await fetch(
        `/wp-json/rna/v1/check-domain?domain=${domain}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error checking domain:", error);
      setResult({ error: "Failed to check domain" });
    }

    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button onClick={checkDomain} disabled={loading}>
        {loading ? "Checking..." : "Check Availability"}
      </button>

      {result && (
        <div>
          {result.error ? (
            <p>Error: {result.error}</p>
          ) : (
            <p>
              {result.available ? "Domain is available" : "Domain is taken"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const appElement = document.getElementById("rna-domain-checker");
  if (appElement) {
    ReactDOM.render(<DomainChecker />, appElement);
  }
});
