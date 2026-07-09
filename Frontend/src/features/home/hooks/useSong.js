import { getSong } from "../service/song.api";
import { useContext } from "react";
import { songContext } from "../song.context";

export const useSong = () => {
    const context = useContext(songContext);
    const { loading, setloading, song, setsong } = context;

    async function handleGetSong(payload) {
        setloading(true);

        try {
            if (payload && typeof payload === 'object' && payload.url) {
                setsong(payload);
                return;
            }

            const mood = payload;
            const res = await getSong({ mood });
            const songData = res?.song ?? {
                title: `Mood: ${mood}`,
                mood,
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                posterUrl: 'https://via.placeholder.com/120x120?text=' + mood,
            };
            setsong(songData);
        } catch (error) {
            console.error('Failed to fetch song:', error);
        } finally {
            setloading(false);
        }
    }

    return ({
        loading,
        song,
        handleGetSong,
    })
}
