"use client"
import { useState, useEffect } from "react"
import { searchEvents } from "../../../services/user/userEventServices"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()

  // Debounce the input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 400)

    return () => clearTimeout(handler)
  }, [query])

  // Fetch suggestions
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    ;(async () => {
      try {
        const data = await searchEvents(debouncedQuery, 1, 5)
        if (data.success) {
          setSuggestions(data.events)
        } else {
          setSuggestions([])
        }
      } catch (error) {
        console.log("Search error:", error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    })()
  }, [debouncedQuery])

  const handleSelect = (eventTitle) => {
    setQuery("")
    setSuggestions([])
    setIsFocused(false)
    navigate(`/user/search?query=${encodeURIComponent(eventTitle)}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      handleSelect(query)
    }
  }

  return (
    <div className="relative w-full max-w-md cursor-default">
      <form onSubmit={handleSubmit} className="relative cursor-default">
        <div className="relative cursor-default">
          {/* Search Icon */}
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />

          {/* Input Field - Matching the minimal design in the image */}
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full pl-7 pr-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 cursor-text"
          />

          {/* Loading Indicator - Very subtle */}
          {isLoading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <div className="animate-spin rounded-full h-3 w-3 border border-gray-400 border-t-transparent"></div>
            </div>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown - Simplified */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-sm z-50 overflow-hidden cursor-default">
          <ul className="max-h-48 overflow-y-auto">
            {suggestions.map((event) => (
              <li
                key={event._id}
                onClick={() => handleSelect(event.title)}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-xs text-gray-700 border-b border-gray-100 last:border-b-0"
              >
                {event.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar
