import { useState } from 'react'

function PhotoCard({ photo, isFavourited, onToggleFavourite }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const imageUrl = `https://picsum.photos/id/${photo.id}/400/300`

  return (
    <article className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">

      <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '4/3' }}>
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        <button
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
          className={`
            absolute top-2 right-2
            w-9 h-9 rounded-full
            flex items-center justify-center
            transition-all duration-200 hover:scale-110
            ${isFavourited
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white/90 text-gray-500 opacity-0 group-hover:opacity-100'
            }
          `}
        >
          <svg
            className="w-4 h-4"
            fill={isFavourited ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-xs text-amber-500 uppercase tracking-wider mb-0.5">Photographer</p>
          <p className="text-sm font-medium text-gray-800 truncate">{photo.author}</p>
        </div>
        {isFavourited && (
          <span className="flex-shrink-0 ml-2 text-xs text-amber-500 border border-amber-300 rounded-full px-2 py-0.5">
            Saved
          </span>
        )}
      </div>
    </article>
  )
}

export default PhotoCard