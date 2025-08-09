import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [urls, setUrls] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => setUrls(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
        <button
            onClick={() => navigate('/')}
            className="flex items-center mt-0 mb-2 gap-2 py-2 px-4 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg active:scale-95 transition-all duration-200"
            >
            ⬅ Back
      </button>
      <h1 className="text-4xl font-bold mb-6 text-gray-800">📊 Admin Dashboard</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <tr>
              <th className="p-4 text-center font-semibold">Short URL</th>
              <th className="p-4 text-center font-semibold">Visits</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, index) => (
              <tr
                key={url._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                <td className="p-4 text-center">
                  <a
                    href={`http://localhost:5000/${url.shortId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {`http://localhost:5000/${url.shortId}`}
                  </a>
                </td>
                <td className="p-4 text-center font-semibold text-gray-800">
                  {url.clicks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
