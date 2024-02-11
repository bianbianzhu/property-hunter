import { writable } from "svelte/store";
import type { DfInfoCardEventDetail } from "../types/dfMessenger-types";

type Item = Required<Pick<DfInfoCardEventDetail, "title" | "actionLink">>;

type SavedItem = Item & {
  agentResponse: string;
};

type SavedItemState = {
  entities: SavedItem[];
};

export const savedItemState = writable<SavedItemState>({
  entities: [],
});

export const addSavedItem = (item: SavedItem) => {
  const { title, actionLink, agentResponse } = item;

  savedItemState.update((state) => {
    const isDuplicate = state.entities.some((entity) => entity.actionLink === actionLink);

    if (isDuplicate) {
      return state;
    }

    return {
      ...state,
      entities: [...state.entities, { title, actionLink, agentResponse }],
    };
  });
};

export const deleteSavedItem = (actionLink: string) => {
  savedItemState.update((state) => {
    return {
      ...state,
      entities: state.entities.filter((entity) => entity.actionLink !== actionLink),
    };
  });
};

export let showBookShelf = writable(false);
