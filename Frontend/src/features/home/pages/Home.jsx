import React, { useState } from 'react'
import FaceExpression from '../../expression/components/FaceExpression'
import Player from '../components/Player'
import MoodPlaylist from '../components/MoodPlaylist'
import { useSong } from '../hooks/useSong'

const home = () => {
  const { handleGetSong } = useSong()
  const [selectedMood, setSelectedMood] = useState('happy')

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    handleGetSong(mood)
  }

  const handleTrackPlay = (track) => {
    handleGetSong(track)
  }

  const handleExpressionDetected = (expression) => {
    const normalized = (expression || '').toLowerCase()
    const moodMap = {
      happy: 'happy',
      sad: 'sad',
      calm: 'calm',
      surprised: 'surprised',
      energetic: 'energetic',
      neutral: 'calm',
      angry: 'calm',
    }

    const mappedMood = moodMap[normalized] || normalized

    if (mappedMood) {
      handleMoodSelect(mappedMood)
    }
  }

  return (
    <div className="home-layout">
      <div className="home-main-content">
        <FaceExpression onClick={handleExpressionDetected} />
        <Player />
      </div>

      <div className="home-sidebar">
        <MoodPlaylist
          selectedMood={selectedMood}
          onSelectMood={handleMoodSelect}
          onPlayTrack={handleTrackPlay}
        />
      </div>
    </div>
  )
}

export default home