import useOnline from "../../hooks/useOnline";

export default function Offline({ children }) {
    let isOnline = useOnline();
    if (isOnline === false) return children
}
