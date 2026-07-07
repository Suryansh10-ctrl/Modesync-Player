import React, { useContext, useEffect, useRef, useState } from 'react'
import { songContext } from '../song.context'
import '../style/player.scss'

const Player = () => {
  const { song } = useContext(songContext)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.playbackRate = playbackRate
  }, [playbackRate, song?.url])

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return '0:00'

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('Audio play error:', error)
    }
  }

  const skipTime = (seconds) => {
    const audio = audioRef.current
    if (!audio) return

    const nextTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration || audio.duration || 0)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const handleSeek = (event) => {
    const audio = audioRef.current
    if (!audio) return

    const nextTime = Number(event.target.value)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  return (
    <div className="player-card">
      <img
        src={song?.posterUrl || 'https://via.placeholder.com/120x120?text=No+Poster'}
        alt={song?.title || 'Song poster'}
        className="player-poster"
      />

      <div className="player-main">
        <audio
          ref={audioRef}
          src={song?.url}
          onLoadedMetadata={(event) => setDuration(event.target.duration || 0)}
          onTimeUpdate={(event) => setCurrentTime(event.target.currentTime)}
          onEnded={() => {
            setIsPlaying(false)
            setCurrentTime(0)
          }}
        />

        <div style={{ marginBottom: '0.5rem' }}>
          <h3 className="player-title">{song?.title || 'Now playing'}</h3>
          <p className="player-meta">{song?.mood || 'Choose a mood'}</p>
        </div>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="player-progress"
        />

        <div className="player-time-row">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="player-controls">
          <button
            onClick={() => skipTime(-5)}
            className="player-btn"
            type="button"
          >
            ⏪ 5s
          </button>

          <button
            onClick={togglePlay}
            className="player-btn player-btn--primary"
            type="button"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <button
            onClick={() => skipTime(5)}
            className="player-btn"
            type="button"
          >
            5s ⏩
          </button>

          <select
            value={playbackRate}
            onChange={(event) => setPlaybackRate(Number(event.target.value))}
            className="player-select"
          >
            <option value="0.75">0.75×</option>
            <option value="1">1×</option>
            <option value="1.25">1.25×</option>
            <option value="1.5">1.5×</option>
            <option value="2">2×</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Player