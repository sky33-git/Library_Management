import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const navigate = useNavigate();
  const loc = useLocation();
  const pathBool = loc.pathname.startsWith('/adminportal');

  useEffect(() => {

    const fetchApi = async () => {
      try {

        setLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5000/api/books');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const resData = await response.json()
        setBooks(resData)
        setFilteredData(resData)
      }
      catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Please try again later.");
      }
      finally {
        setLoading(false)
      }
    }

    fetchApi()
  }, [])

  const resetFilters = () => {
    setFilteredData(books)
    setSearchData('')
  }

  const readBook = (id) => {
    if (pathBool) {
      navigate(`/adminportal/readbooks/${id}`)
    } else {
      navigate(`/userportal/readbooks/${id}`)
    }
  };

  const deleteBook = async (id, title) => {

    if (window.confirm(`Do you want to delete "${title}" book?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`, { method: 'DELETE' })

        if (!response.ok) {
          throw new Error(`Failed to delete book: ${response.status}`)
        }
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
        setFilteredData(prevFilteredData => prevFilteredData.filter(book => book.id !== id));
        alert(`"${title}" Book is deleted!`);
      } catch (err) {
        console.error("Error deleting book:", err);
        alert(`Failed to delete "${title}" Book. Error: ${err.message}`);
      }
    } else {
      alert(`"${title}" Book is not deleted!`);
    }
  };

  const addToCart = async (bookToAdd) => {
    if (window.confirm(`Do you want to add "${bookToAdd.title}" book to your Cart?`)) {
      try {

        const response = await fetch('http://localhost:5000/api/carts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookToAdd),
        })

        if (!response.ok) {
          throw new Error(`Failed to add to cart: ${response.status}`);
        }

        alert(`"${bookToAdd.title}" Book is added to your Cart!`)
      }
      catch (err) {
        console.error("Error adding to cart:", err);
        alert(`Failed to add "${bookToAdd.title}" Book to cart. Error: ${err.message}`);
      }
    }
    else {
      alert(`"${bookToAdd.title}" Book is not added!`);
    }
  }

  const applyFilters = () => {
   
    let currentData = [...books];
    if (searchData) {
      currentData = currentData.filter(
        (ele) => ele.title.toLowerCase().includes(searchData.toLowerCase())
      );
    }

    setFilteredData(currentData);
  }

  useEffect(() => {
    applyFilters()

  }, [searchData, books])

  const bigBook = () => {
    const data = books.filter((ele) => ele.pageCount > 300);
    setFilteredData(data)
  }

  const smallBook = () => {
    const data = books.filter((ele) => ele.pageCount < 300);
    setFilteredData(data)
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-purple-900 text-center mb-8">
        THE Sky ----- Library Books!
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex gap-2 w-full sm:w-auto flex-grow">
          <input
            type="text"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search books by title..."
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 flex-grow"
          />

          <button
            onClick={searchData}
            className="bg-purple-700 text-white px-4 rounded-md cursor-pointer hover:bg-purple-800 transition whitespace-nowrap"
          >
            Search
          </button>
        </div>

        <div className="flex gap-4 flex-wrap justify-center sm:justify-start"> 
          <button
            onClick={bigBook}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition whitespace-nowrap"
          >
            Big Books
          </button>
          <button
            onClick={smallBook}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition whitespace-nowrap"
          >
            Small Books
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-500 transition whitespace-nowrap"
          >
            All Books
          </button>
        </div>

        <p className="text-purple-900 font-semibold mt-2 sm:mt-0 text-center sm:text-right w-full sm:w-auto">
          Total Books: {filteredData.length}
        </p>
      </div>

      {loading && (
        <div className="text-center text-purple-800 text-xl font-semibold mt-10">
          Loading books...
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 text-xl font-semibold mt-10">
          Error: {error}
        </div>
      )}

      {!loading && !error && filteredData.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 

          {filteredData.map(

            ({ id, title, isbn, pageCount, thumbnailUrl, status, authors, categories }) => (
              <div
                key={id}
                className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300" // Removed md:flex-row to make cards vertical on all screens
              >
                <div className="w-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-purple-100 to-purple-200">
                  <img
                    src={thumbnailUrl || 'https://via.placeholder.com/150x200?text=No+Image'}
                    alt={title}
                    className="w-40 h-48 object-contain mb-2 rounded-md shadow-md"
                  />
                </div>

                <div className="w-full p-6 flex flex-col justify-between flex-grow">
                  <h3 className="text-2xl font-semibold mb-4 text-purple-900">{title}</h3>
                  <table className="table-auto w-full text-left text-gray-700 mb-4 text-sm md:text-base"> 
                    <tbody>
                      <tr>
                        <td className="py-1 font-medium pr-2 whitespace-nowrap">Reg No:</td>
                        <td className="py-1">{isbn}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-1 font-medium pr-2 whitespace-nowrap">Author:</td>
                        <td className="py-1">{Array.isArray(authors) ? authors.join(', ') : authors || 'AUTHOR II'}</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium pr-2 whitespace-nowrap">Status:</td>
                        <td className="py-1">{status || 'N/A'}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-1 font-medium pr-2 whitespace-nowrap">Categories:</td>
                        <td className="py-1">{Array.isArray(categories) ? categories.join(', ') : categories || 'N/A'}</td> 
                      </tr>
                      <tr>
                        <td className="py-1 font-medium pr-2 whitespace-nowrap">Page Count:</td>
                        <td className="py-1">{pageCount || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex gap-4 mt-auto">
                    <button
                      onClick={() => readBook(id)}
                      className="flex-1 bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800
                       transition duration-200 cursor-pointer">
                      Read More
                    </button>

                    {pathBool ? (
                      <button
                        onClick={() => deleteBook(id, title)}
                        className="flex-1 border border-red-600 text-red-600 py-2 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition duration-200"
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart({ id, title, thumbnailUrl, authors, categories, pageCount, isbn, status })}
                        className="flex-1 bg-green-600 text-white py-2 rounded-md cursor-pointer hover:bg-green-700 transition duration-200"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        !loading && !error && (
          <h2 className="text-center text-purple-800 text-xl font-semibold mt-10">
            No Books Found.
          </h2>
        )
      )}
    </div>
  );
};

export default Books;