import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

const Readbook = () => {
  const { id: bookId } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showShortDescription, setShowShortDescription] = useState(false);
  const [showLongDescription, setShowLongDescription] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPath = location.pathname.startsWith("/adminportal");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get(`http://localhost:5000/api/books/${bookId}`)
        setBook(response.data);
      }
      catch (err) {
        console.error("Error fetching book details:", err)
        setError("Failed to load book details. Please try again.")
      }
      finally {
        setLoading(false);
      }
    }

    fetchBook()
  }, [bookId])

  const {
    title,
    pageCount,
    thumbnailUrl,
    status,
    authors,
    categories,
    shortDescription,
    longDescription,
  } = book;

  const formatArray = (arr) => (Array.isArray(arr) ? arr.join(", ") : arr || "N/A")

  const toggleShortDescription = () => {
    setShowShortDescription((prev) => !prev);
  };

  const toggleLongDescription = () => {
    setShowLongDescription((prev) => !prev);
  }

  const handleBackButtonClick = () => {
    if (isAdminPath) {
      navigate("/adminportal/books");
    } else {
      navigate("/userportal/books");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <p className="text-2xl font-semibold text-gray-700">Loading book details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-200 p-4">
        <p className="text-2xl font-semibold text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!book || Object.keys(book).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <p className="text-2xl font-semibold text-gray-700">Book not found.</p>
        <div>Please check
          <NavLink className={"no-underline"} to={handleBackButtonClick}>Books </NavLink>
          section more info
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-5xl w-full flex flex-col lg:flex-row mt-8 mb-8">

        <div className="lg:w-1/3 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-purple-150 to-indigo-200 text-center">
          <img
            src={thumbnailUrl || "https://via.placeholder.com/250x300?text=No+Image"}
            alt={title || "Book Cover"}
            className="w-56 h-72 object-contain rounded-lg shadow-lg mb-6"
          />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{title}</h2>
          <p className="text-xl text-gray-700 font-medium italic">by {formatArray(authors)}</p>
        </div>

        <div className="lg:w-2/3 p-6 sm:p-8 flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-6 border-b pb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-700 mb-6 font-medium lg:hidden">by {formatArray(authors)}
          </p>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700 text-lg mb-1">Status:</span>
              <span className="text-gray-900 text-xl">{status || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700 text-lg mb-1">Categories:</span>
              <span className="text-gray-900 text-xl">{formatArray(categories)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700 text-lg mb-1">Page Count:</span>
              <span className="text-gray-900 text-xl">{pageCount || "N/A"}</span>
            </div>
          </div>

          <div className="mb-8 space-y-6">
            {shortDescription && (
              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <button
                  onClick={toggleShortDescription}
                  className="w-full flex justify-between items-center text-left text-xl font-bold text-indigo-700 hover:text-indigo-900 transition-colors duration-200 focus:outline-none"
                >
                  <span>Short Description</span>
                  <span>{showShortDescription ? "▲" : "▼"}</span>
                </button>
                <p className={`mt-3 text-gray-800 text-base leading-relaxed ${showShortDescription ? 'block' : 'hidden'}`}>
                  {shortDescription}
                </p>
              </div>
            )}

            {longDescription && (
              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <button
                  onClick={toggleLongDescription}
                  className="w-full flex justify-between items-center text-left text-xl font-bold text-indigo-700 hover:text-indigo-900 transition-colors duration-200 focus:outline-none"
                >
                  <span>Long Description</span>
                  <span>{showLongDescription ? "▲" : "▼"}</span>
                </button>
                <p className={`mt-3 text-gray-800 text-base leading-relaxed ${showLongDescription ? 'block' : 'hidden'}`}>
                  {longDescription}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-start mt-auto pt-4 border-t border-gray-200">
            <button
              onClick={handleBackButtonClick}
              className="bg-gray-600 text-white py-3 px-8 rounded-full shadow-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-lg font-medium"
            >
              Back to Books
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Readbook;