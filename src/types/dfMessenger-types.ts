export type DfInfoCardEventDetail = {
  title?: string;
  image?: {
    src: { rawUrl: string };
  };
  actionLink?: string;
};

/** the detailed response type from the Dialogflow Messenger */
export type DfResponseEventDetail = {
  messages: Message[]; // the **major content** of the response messages; normally has 2 messages from the agent: 1st is text, 2nd is rich content in the form of a custom card.
  data: {
    messages: Message[]; // exactly the same as `messages` above
  };
  raw: {
    responseId: string;
    queryResult: {
      text: string; // the user's query
      languageCode: string; // "en"
      responseMessages: ResponseMessage[];

      diagnosticInfo: DiagnosticInfo;
      match: {
        matchType: string; // "NO_MATCH" | "KNOWLEDGE_CONNECTOR"
        knowledgeConnectorAnswer: KnowledgeConnectorAnswer[];
      };

      advancedSettings: {
        loggingSettings: {
          disableLogging: boolean;
        };
      };

      currentFlow: {
        name: string; // "Default Start Flow"
        displayName: string;
      };
      currentPage: {
        name: string; // "Start Page"
        displayName: string;
      };

      generativeInfo: {
        actionTracingInfo: {
          name: string;
          actions: Action[];
          conversationState: string; // "OUTPUT_STATE_PENDING"
        };
      };
    };
    responseType: string; // "FINAL"
    ulmCalls: number;
  };
};

type Message =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "customCard";
      richElements: RichContent[]; // currently, only 1 element is expected
    };

type RichContent = {
  subtitle: string; // the summary of the answer found in the cloud storage item
  title: string; // the title of the cloud storage item
  actionLink: string; // the link to the cloud storage item
  type: string; // "info"
  id: string;
};

type ResponseMessage =
  | {
      text: {
        text: string[]; // the 1st message is equivalent to the `text` field in the `Message` type - raw.queryResult.responseMessages[0].text.text[0] === messages[0].text
        redactedText: string[];
        containAiGeneratedContent: boolean;
        containDataStoreContent: boolean;
        containAttemptedDataStoreInteractions: boolean;
        containGroundingFailures: boolean;
      };
      responseType: string; // "HANDLER_PROMPT"
      source: string; // "VIRTUAL_AGENT"
      payload?: never;
    }
  | {
      payload: {
        richContent: RichContent[][]; // nested array; richContent[0][0] is the same as the `richElements` field in the `Message` type - raw.queryResult.responseMessages[1].payload.richContent[0][0] === messages[1].richElements[0]
      };
      responseType: string; // "HANDLER_PROMPT"
      source: string; // "VIRTUAL_AGENT"
      text?: never;
    };

type DiagnosticInfo = {
  "DataStore Execution Sequence": {
    executionResult: ExecutionResult;
    steps: Step[];
    additionalInfo: AdditionalInfo;
  };
};

type ExecutionResult = {
  banned_phrase: string;
  unstructured_citation: boolean;
  banned_phrase_check_type: string;
  ucs_fallback: boolean;
  latency: number;
  website_citation: boolean;
  response_type: string;
  response_reason: string;
  language: string;
  faq_citation: boolean;
};

type Step = {
  name: string;
  responses?: any[];
  status?: {
    code: string;
  };
  info?: string;
};

type AdditionalInfo = {
  agent_project_number: string;
  ucs_project_number: string;
  rewritten_query: string;
  user_query: string;
  tracking_id: string;
};

type KnowledgeConnectorAnswer = {
  answer: string;
  generativePrediction: {
    snippets: Snippet[]; // the snippets that support the answer, the 1st snippet is the final answer; to allow the user to get more info, the rest of the snippets can also be included
    groundingInfo: {
      score: string;
      snippetsSupportingIndices: {
        indices: number[];
      }[];
    };
  };
};

type Snippet = {
  uri: string;
  text: string; // the summary of the answer found in the cloud storage item
  title: string; // the title of the cloud storage item
};

type Action = {
  userUtterance?: {
    text: string;
  };
  agentUtterance?: {
    text: string;
  };
};

export function isCustomEvent<T>(event: Event): event is CustomEvent<T> {
  return "detail" in event;
}
