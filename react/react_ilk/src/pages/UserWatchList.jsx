import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import WatchList from "../components/WatchList";

export default function UserWatchList() {
  const { watchlist, removeFromWatchList } = useContext(UserContext);

  return (
    <WatchList
      movies={watchlist}
      title="Watch List"
      onRemoveFromWatchList={removeFromWatchList}
    />
  );
}
