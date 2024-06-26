export const getFontRandomColorClass = () => {
  const colors = [
    'text-red-400',
    'text-red-500',
    'text-blue-400',
    'text-blue-500',
    'text-green-400',
    'text-green-500',
    'text-yellow-500',
    'text-yellow-400',
    'text-purple-500',
    'text-purple-400',
    'text-pink-500',
    'text-pink-400',
    'text-indigo-400',
    'text-indigo-500',
    'text-stone-400',
    'text-stone-500',
    'text-orange-400',
    'text-orange-500',
    'text-amber-400',
    'text-amber-500',
    'text-lime-400',
    'text-lime-500',
    'text-gray-400',
    'text-gray-500',
    'text-teal-400',
    'text-teal-500',
    'text-rose-400',
    'text-rose-500',
    'text-sky-400',
    'text-sky-500',
    'text-cyan-400',
    'text-cyan-500',
    'text-emerald-400',
    'text-emerald-500'
  ]
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
