import React, { useState } from "react";
import axios from "axios";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate=useNavigate()

  const handleShorten = async () => {
    if (!longUrl.trim()) {
      setError("Please enter a valid URL");
      return;
    }
    
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/shorten", { longUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError("Failed to shorten URL");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          URL Shortener
        </h1>

        <input
          type="text"
          placeholder="Enter your long URL..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleShorten}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg mt-4 transition duration-200"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg text-center">
            <p className="text-gray-700">Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {shortUrl}
            </a>

            <button
              onClick={copyToClipboard}
              className="ml-3 inline-flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-300"
            >
              {copied ? (
                <CheckIcon className="h-5 w-5 animate-bounce" />
              ) : (
                <ClipboardIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        )}

        <div className="text-center mt-4">
            <button
                className="text-black p-3 mt-3 bg-gray-300 rounded hover:bg-gray-400"
                onClick={()=>navigate('/admin')}
            >
                Admin Page
            </button>
        </div>

      </div>
    </div>
  );
}
