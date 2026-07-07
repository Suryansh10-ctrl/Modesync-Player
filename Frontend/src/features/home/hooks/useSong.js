import { getSong } from "../service/song.api";
import { useContext } from "react";
import { songContext } from "../song.context";


export const useSong = () => {
    const context = useContext(songContext);
    const {loading,setloading,song,setsong} = context;

    async function handleGetSong(mood) {
    setloading(true);

    const res = await getSong({ mood });

    setsong(res.song);

    setloading(false);
    }

    return ({
        loading,
        song,
        handleGetSong,
    })
}
