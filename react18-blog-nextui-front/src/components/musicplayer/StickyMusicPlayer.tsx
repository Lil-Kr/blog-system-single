import React, { useRef, useState } from 'react'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'

interface MusicPlayerProps {
  src: string
  title?: string
}

const StickyMusicPlayer: React.FC<MusicPlayerProps> = ({ src, title }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <div className='flex items-center gap-4 px-4 py-2 backdrop-blur dark:border-gray-600 transition-all hover:scale-105'>
      <button onClick={togglePlay} className='p-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white'>
        {isPlaying ? <PauseIcon className='h-5 w-5' /> : <PlayIcon className='h-5 w-5' />}
      </button>
      {title && <div className='text-sm font-medium text-gray-800 dark:text-gray-100'>{title}</div>}
      <audio ref={audioRef} src={src} loop />
    </div>
  )
}

export default StickyMusicPlayer
