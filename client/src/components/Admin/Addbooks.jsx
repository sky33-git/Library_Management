import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addbooks = () => {

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bool, setBool] = useState(false)

  let navigate = useNavigate;

  useEffect(() => {
    if (bool) {
      navigate(`/adminportal/books`)
      setBool(false)
    }
  }, [bool])

  const [bookData, setBookData] = useState({
    title: '',
    isbn: '',
    pageCount: '',
    thumbnailUrl: '',
    shortDescription: '',
    longDescription: '',
    status: '',
    authors: '',
    categories: '',
  })

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);

    const newBook = {
      ...bookData,
      pageCount: parseInt(bookData.pageCount, 10) || 60,
      authors: bookData.authors.split(',').map(s => s.trim()).filter(s => s),
      categories: bookData.categories.split(',').map(s => s.trim()).filter(s => s)
    }

    try {
      const response = await axios.post("https://library-management-jguy.onrender.com/api/books", newBook)

      if (response.status === 201 || response.status === 200) {
        setSubmissionStatus('success')
        setSubmissionMessage('Book added to the library successfully!')

        setBookData({
          title: '',
          isbn: '',
          pageCount: '',
          thumbnailUrl: '',
          shortDescription: '',
          longDescription: '',
          status: '',
          authors: '',
          categories: '',
        })
        // setBool(true)
      }
      else {
        throw new Error(`Server responded with status: ${response.status}`)
      }
    }
    catch (error) {
      console.error("Error adding book:", error)
      setSubmissionStatus('error');
      setSubmissionMessage(`Failed to add book: ${error.message || 'Network error'}.`)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl animate-fade-in-down">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">Add New Book</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
              Name of the Book <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              id="title"
              value={bookData.title}
              onChange={handleChange}
              placeholder="Enter the book name!"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="isbn" className="block text-lg font-semibold text-gray-700 mb-2">
              Registration Number (ISBN) <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              id="isbn"
              value={bookData.isbn}
              onChange={handleChange}
              placeholder="Enter the registration number"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="pageCount" className="block text-lg font-semibold text-gray-700 mb-2">
              Number of Pages <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              id="pageCount"
              value={bookData.pageCount}
              onChange={handleChange}
              placeholder="Page Count"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="thumbnailUrl" className="block text-lg font-semibold text-gray-700 mb-2">
              Book Cover Image URL
            </label>

            <input
              type="text"
              id="thumbnailUrl"
              value={bookData.thumbnailUrl}
              onChange={handleChange}
              placeholder="Paste the link here!"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="shortDescription" className="block text-lg font-semibold text-gray-700 mb-2">
              Short Description
            </label>

            <textarea
              id="shortDescription"
              value={bookData.shortDescription}
              onChange={handleChange}
              rows="3"
              placeholder="Describe shortly!"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-y"
            ></textarea>
          </div>

          <div>
            <label htmlFor="longDescription" className="block text-lg font-semibold text-gray-700 mb-2">
              Long Description
            </label>

            <textarea
              id="longDescription"
              value={bookData.longDescription}
              onChange={handleChange}
              rows="6"
              placeholder="Describe briefly!"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-y"
            ></textarea>
          </div>

          <div>
            <label htmlFor="status" className="block text-lg font-semibold text-gray-700 mb-2">
              Status
            </label>

            <input
              type="text"
              id="status"
              value={bookData.status}
              onChange={handleChange}
              placeholder="e.g., PUBLISH"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="authors" className="block text-lg font-semibold text-gray-700 mb-2">
              Author Name(s) <span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 ml-2">(Separate multiple authors with commas)</span>
            </label>

            <input
              type="text"
              id="authors"
              value={bookData.authors}
              onChange={handleChange}
              placeholder="e.g., John Doe, Jane Smith"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="categories" className="block text-lg font-semibold text-gray-700 mb-2">
              Categories <span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 ml-2">(Separate multiple categories with commas)</span>
            </label>

            <input
              type="text"
              id="categories"
              value={bookData.categories}
              onChange={handleChange}
              placeholder="e.g., Fiction, Science"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {submissionStatus && (
            <div className={`p-3 rounded-md text-center font-semibold ${submissionStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
              {submissionMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-xl shadow-md cursor-pointer
                       hover:bg-indigo-700 transition-all duration-200 active:animate-press 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                       ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Adding Book...' : 'Add Book to the Library!'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addbooks;
