import { Children, createContext, useState } from "react";

export const songContext = createContext()

export const SongContextProvider = ({children}) => {
        const [song,setsong] = useState({

        "url": "https://ik.imagekit.io/ziqgarrrh/cohort-2/modify/songs/Hass_Hass_eqIUe3u6G.mp3",
        "posterUrl": "https://ik.imagekit.io/ziqgarrrh/cohort-2/modify/posters/Hass_Hass_Z3HfnEX1q.jpeg",
        "title": "Hass Hass",
        "mood": "happy",

    })

    const [loading, setloading] = useState(false);

    return (
        <songContext.Provider value={{loading,setloading,song,setsong}}>
            {children}
        </songContext.Provider>
    )
}