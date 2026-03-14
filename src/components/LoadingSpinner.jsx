function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
        <div className="spinner absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500" />
      </div>
      <p className="text-gray-400 text-sm">Loading photos…</p>
    </div>
  )
}

export default LoadingSpinner