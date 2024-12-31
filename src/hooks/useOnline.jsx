import { useState } from "react";

export default function useOnline() {
    let [isOnlone, setIsOnline] = useState(true);
    window.addEventListener('online', () => {
        setIsOnline(true)
    })
    window.addEventListener('offline', () => {
        setIsOnline(false)
    })
    return isOnlone
}