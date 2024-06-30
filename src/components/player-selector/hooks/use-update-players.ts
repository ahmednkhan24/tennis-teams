import { Dispatch, SetStateAction, useCallback } from 'react';
import { useLifecycles } from 'react-use';
import { v4 as uuid } from 'uuid';
import { useFocusOnPlayer } from './use-focus-on-player';

export const createPlayer = (): Player => ({ name: '', id: uuid() });

export const createPlayers = (numPlayers: number) =>
  Array(numPlayers).fill(undefined).map(createPlayer);

export interface UseUpdatePlayersProps {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  minPlayers: number;
}

export function useUpdatePlayers({
  players,
  setPlayers,
  minPlayers,
}: UseUpdatePlayersProps) {
  const { inputRefs, setPlayerIndexToFocusOn, focusOnInput } =
    useFocusOnPlayer();

  // component first mount
  // clean up any empty <input /> elements by filtering them out
  // create the minimum # of <input /> elements depending on the matchType (singles, doubles)
  // reset the references to the <input /> elements due to the clean up / re-creation
  useLifecycles(() => {
    const playersWithNames = players.filter(({ name }) => !!name);

    const difference = minPlayers - playersWithNames.length;

    inputRefs.current = [];

    if (difference > 0) {
      setPlayers([...playersWithNames, ...createPlayers(difference)]);
    } else {
      setPlayers(playersWithNames);
    }
  });

  const addNewPlayer = useCallback(
    () => setPlayers((p) => [...p, createPlayer()]),
    [setPlayers]
  );

  const removePlayer = useCallback(
    (id: string) => setPlayers((p) => p.filter((player) => player.id !== id)),
    [setPlayers]
  );

  const updatePlayerName = useCallback(
    (id: string, name: string) =>
      setPlayers((p) =>
        p.map((player: Player) =>
          player.id === id ? { ...player, name } : player
        )
      ),
    [setPlayers]
  );

  const focusOnNextPlayer = useCallback(
    (playerNum: number) => {
      if (playerNum === players.length - 1) {
        // add a new player entry, then focus on it
        addNewPlayer();
        setPlayerIndexToFocusOn(playerNum + 1);
      } else {
        // focus on the next input
        focusOnInput(playerNum + 1);
      }
    },
    [addNewPlayer, focusOnInput, players.length, setPlayerIndexToFocusOn]
  );

  return {
    inputRefs,
    addNewPlayer,
    removePlayer,
    updatePlayerName,
    focusOnNextPlayer,
  };
}
