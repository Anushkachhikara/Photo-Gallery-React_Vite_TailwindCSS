import { useReducer, useState, useMemo, useCallback } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import { favouritesReducer, initFavourites } from '../hooks/favouritesReducer'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

function Gallery() {

  // 1. Fetch photos via custom hook
  const { photos, loading, error } = useFetchPhotos(30)

  // 2. Favourites via useReducer — initFavourites reads localStorage once on mount
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    initFavourites
  )

  // 3. Search input state
  const [searchQuery, setSearchQuery] = useState('')

  // 4. Favourites-only filter toggle
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false)

  // 5. useCallback — stable reference, avoids new function on every render
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value)
  }, [])

  // 6. useCallback — stable reference for toggling a favourite
  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id })
  }, [])

  // 7. useMemo — only recomputes when photos/searchQuery/favourites actually change
  const filteredPhotos = useMemo(() => {
    let result = photos

    if (showFavouritesOnly) {
      result = result.filter((photo) => favourites.has(photo.id))
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter((photo) =>
        photo.author.toLowerCase().includes(query)
      )
    }

    return result
  }, [photos, searchQuery, showFavouritesOnly, favourites])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">

            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Photo Gallery</h1>
              <p className="text-xs text-gray-400">Powered by Picsum Photos</p>
            </div>

            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                resultCount={filteredPhotos.length}
                totalCount={photos.length}
              />
            </div>

            <button
              onClick={() => setShowFavouritesOnly((prev) => !prev)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                showFavouritesOnly
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg
                className="w-4 h-4"
                fill={showFavouritesOnly ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Saved {favourites.size > 0 && `(${favourites.size})`}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {loading && <LoadingSpinner />}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && showFavouritesOnly && favourites.size === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-2">
            <p className="text-gray-400 text-lg">No saved photos yet</p>
            <p className="text-gray-300 text-sm">Click the heart on any photo to save it here</p>
          </div>
        )}

        {!loading && !error && searchQuery && filteredPhotos.length === 0 && (
          <div className="flex items-center justify-center py-24">
            <p className="text-gray-400">No results for "{searchQuery}"</p>
          </div>
        )}

        {/* Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="card-enter"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <PhotoCard
                  photo={photo}
                  isFavourited={favourites.has(photo.id)}
                  onToggleFavourite={handleToggleFavourite}
                />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && photos.length > 0 && (
          <p className="text-center text-xs text-gray-300 mt-12">
            Photos from{' '}
            <a href="https://picsum.photos" target="_blank" rel="noreferrer" className="underline hover:text-gray-400">
              Picsum Photos
            </a>
          </p>
        )}
      </main>
    </div>
  )
}

export default Gallery

