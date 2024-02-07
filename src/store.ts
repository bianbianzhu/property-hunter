import { writable } from "svelte/store";

export type InfoCardEventDetail = {
  title?: string;
  image?: {
    src: { rawUrl: string };
  };
  actionLink?: string;
};

type Item = Required<Pick<InfoCardEventDetail, "title" | "actionLink">>;

type SavedItem = Item & {
  purchaseLink: string;
};

type SavedItemState = {
  entities: SavedItem[];
};

export const savedItemState = writable<SavedItemState>({
  entities: [],
});

export const addSavedItem = (item: SavedItem) => {
  const { title, actionLink, purchaseLink } = item;

  savedItemState.update((state) => {
    const isDuplicate = state.entities.some((entity) => entity.actionLink === actionLink);

    if (isDuplicate) {
      return state;
    }

    return {
      ...state,
      entities: [...state.entities, { title, actionLink, purchaseLink }],
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
