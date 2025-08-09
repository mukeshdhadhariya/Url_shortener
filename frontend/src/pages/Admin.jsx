import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); // ensure starts loading immediately

    fetch("https://url-shortener-2-60lp.onrender.com/")
      .then((res) => res.json())
      .then((data) => {
        setUrls(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mb-4"></div>
        <h3 className="text-center text-lg text-gray-600 px-4">
          ⏳ Take one minute to connect with Render backend so wait...
        </h3>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <button
        onClick={() => navigate("/")}
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
                    href={`https://url-shortener-2-60lp.onrender.com/${url.shortId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {`https://url-shortener-2-60lp.onrender.com/${url.shortId}`}
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
