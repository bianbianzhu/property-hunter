import { get, writable } from "svelte/store";
import type { DfResponseEventDetail } from "../types/dfMessenger-types";
import type { RenameByT } from "../types/common";

type RawDfMessengerResponse = Pick<DfResponseEventDetail, "messages"> &
  Pick<DfResponseEventDetail["raw"]["queryResult"], "text"> &
  Pick<
    DfResponseEventDetail["raw"]["queryResult"]["match"]["knowledgeConnectorAnswer"][number]["generativePrediction"],
    "snippets"
  > &
  Pick<DfResponseEventDetail["raw"], "responseId">;

export type DfMessengerResponse = RenameByT<
  {
    messages: "botMessages";
    text: "userQuery";
    snippets: "retrievedSnippets";
    responseId: "id";
  },
  RawDfMessengerResponse
> & {
  hasCustomCardClicked: boolean;
  saved: boolean;
};

type DfMessengerResponseState = {
  entities: DfMessengerResponse[];
};

export const dfMessengerResponseState = writable<DfMessengerResponseState>({
  entities: [],
});

export const addResponse = (response: DfMessengerResponse) => {
  dfMessengerResponseState.update((state) => {
    const isDuplicate = state.entities.some((entity) => entity.id === response.id);

    if (isDuplicate) {
      return state;
    }

    return {
      ...state,
      entities: [...state.entities, response],
    };
  });
};

export const deleteResponse = (id: string) => {
  dfMessengerResponseState.update((state) => {
    return {
      ...state,
      entities: state.entities.filter((entity) => entity.id !== id),
    };
  });
};

/**
 * This function will set the `hasCustomCardClicked` to true for the response that has the custom card with the `actionLink` equal to the `actionLink` property from the event detail of the `df-info-card-click` event - Must be used inside the `df-info-card-click` event listener
 * @param actionLink the `actionLink` property from the event detail of the `df-info-card-click` event
 */
export const setCustomCardClicked = (actionLink: string) => {
  dfMessengerResponseState.update((state) => {
    // gets all the responses that have the custom card with the actionLink
    const viewedResponses = state.entities.filter((entity) => {
      for (const message of entity.botMessages) {
        if (message.type === "customCard") {
          return message.richElements[0].actionLink === actionLink;
        }
      }
    });

    if (viewedResponses.length === 0) {
      return state;
    } else {
      // sets the `hasCustomCardClicked` to true for all the responses
      const viewedResponseIds = viewedResponses.map((viewedResponse) => viewedResponse.id);

      return {
        ...state,
        entities: state.entities.map((entity) => {
          if (viewedResponseIds.includes(entity.id)) {
            return { ...entity, hasCustomCardClicked: true };
          } else {
            return entity;
          }
        }),
      };
    }
  });
};
