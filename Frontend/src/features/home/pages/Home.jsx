import React from 'react'
import FaceExpression from '../../expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'

const home = () => {

    const {handleGetSong} = useSong()

    

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FaceExpression 
      onClick={(expression) => handleGetSong(expression)}
      />
      <Player />
    </div>
  )
}

export default home