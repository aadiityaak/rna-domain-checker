import React, { useState } from "react";
import ReactDOM from "react-dom";

const DomainChecker = () => {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkDomain = async () => {
    if (!domain) return;
    setLoading(true);
    setResult(null); // Reset result sebelum pengecekan baru

    try {
      const response = await fetch(
        `/wp-json/rna/v1/check-domain?domain=${domain}`
      );
      const data = await response.json();

      // Cek jika response success dan terdapat data domain
      if (data.success && data.data.length > 0) {
        const domainInfo = data.data[0];
        setResult({
          available: domainInfo.available === 1, // available 1 berarti tersedia
          name: domainInfo.name,
          message: domainInfo.message,
        });
      } else {
        setResult({ error: "Domain not found or invalid response" });
      }
    } catch (error) {
      console.error("Error checking domain:", error);
      setResult({ error: "Failed to check domain" });
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Enter domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={checkDomain}
        disabled={loading}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        {loading ? "Checking..." : "Check Availability"}
      </button>

      {result && (
        <div className="mt-4">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <p
              className={`text-lg ${
                result.available ? "text-green-500" : "text-red-500"
              }`}
            >
              Domain <strong>{result.name}</strong> is{" "}
              {result.available ? "available" : "taken"} ({result.message})
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
