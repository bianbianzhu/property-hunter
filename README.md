# Property Hunter

## 1. Introduction

Property Hunter is a web app that demonstrates the capabilities of
[Vertex AI Conversation](https://cloud.google.com/generative-ai-app-builder)
that is built on top of functionality in
[Dialogflow CX](https://cloud.google.com/dialogflow).

![Vertex AI Conversation Demo](src/assets/property-hunter.gif)

Using a Data Store Agent, you have the ability to input a website domain, structured data, or unstructured data, after which the Agent processes your content to generate a virtual agent fueled by data stores and extensive language models. This enables your customers and end users to engage in conversations with the agent, asking questions pertaining to the content provided.

![architecture](src/assets/architecture.png)

For detailed information about how to set up the agent, please refer to this Medium article: [How to build your own AI Chatbot within 5 minutes using Google LLM and your private knowledge?](https://medium.com/@lizhuohang.selina/how-to-build-your-own-ai-chatbot-within-5-minutes-using-google-llm-and-your-private-knowledge-eed4b6852917)

## Steps to run the web app locally

1. Clone this repository
1. Run `yarn` to install the dependencies
1. Run `yarn dev` to start the development server

## Steps to deploy the web app to Firebase

1. Navigate to the [Firebase console](https://console.firebase.google.com/)
1. Provision Firebase on a new or existing GCP project
1. In Firebase console, go to Hosting and add a new site (e.g.,
   `your-firebase-app-name`)
1. Install the [firebase CLI](https://firebase.google.com/docs/cli)
1. Run `firebase init` in the app root and follow the prompts to select
   `Hosting`, use the `build` directory, and confirm `N` to the followup
   questions about rewrites, deploys, and the 404 and index pages.
1. Run
   `firebase target:apply hosting your-firebase-app-name your-firebase-app-name`
   where `your-firebase-app-name` is the name of the Firebase Hosting site that
   you created in an earlier step
1. To configure the default deploy target, add a line to your `firebase.json`
   with the name of your Firebase Hosting site, such as:

   ```json
   {
     "hosting": {
       "target": "your-firebase-app-name",  # <--- Add this line
       "public": "build",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ]
     }
   }
   ```

1. Run `firebase deploy`

## Access the app

In your browser, navigate to your deployed app using a URL similar to:

[https://vertex-ai-conversation.web.app/](https://vertex-ai-conversation.web.app/)

Congratulations, you've successfully deployed the Vertex AI Conversation Demo!

## Additional resources

You can continue learning about conversational AI and generative AI with
these guides and resources:

- [Overview of Vertex AI Conversation](https://cloud.google.com/generative-ai-app-builder/docs/agent-intro)
- [Create and use Data Store Agents](https://cloud.google.com/generative-ai-app-builder/docs/agent-usage)
- [Documentation for Dialogflow CX](https://cloud.google.com/dialogflow/cx/docs)
- [Documentation for Data Store Agents](https://cloud.google.com/dialogflow/cx/docs/concept/data-store-agent)
- [Generative AI in Google Cloud](https://cloud.google.com/ai/generative-ai)
