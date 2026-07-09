import React, { useEffect, useState } from 'react';
import { getSong } from '../service/song.api';
import '../style/mood-playlist.scss';

const moodOptions = ['happy', 'calm', 'sad', 'surprised'];

const MoodPlaylist = ({ selectedMood, onSelectMood, onPlayTrack }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function fetchTracks() {
      setLoading(true);

      try {
        const data = await getSong({ mood: selectedMood });
        if (isActive) {
          setTracks(data?.songs || []);
        }
      } catch (error) {
        console.error('Failed to load mood playlist:', error);
        if (isActive) {
          setTracks([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    fetchTracks();

    return () => {
      isActive = false;
    };
  }, [selectedMood]);

  return (
    <section className="mood-playlist-card">
      <div className="mood-playlist-header">
        <div>
          <p className="mood-playlist-label">Mood playlists</p>
          <h3>Pick a vibe and start listening</h3>
        </div>
      </div>

      <div className="mood-chip-row">
        {moodOptions.map((mood) => (
          <button
            key={mood}
            type="button"
            className={`mood-chip ${selectedMood === mood ? 'active' : ''}`}
            onClick={() => onSelectMood(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      <div className="playlist-track-list">
        {loading && <p>Loading songs...</p>}

        {!loading && tracks.length === 0 && <p>No songs uploaded for this mood yet.</p>}

        {!loading && tracks.map((track) => (
          <article key={track._id || track.title} className="playlist-track-item">
            <div>
              <h4>{track.title}</h4>
              <p>{track.mood}</p>
            </div>
            <button type="button" onClick={() => onPlayTrack(track)}>
              Play
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MoodPlaylist;
