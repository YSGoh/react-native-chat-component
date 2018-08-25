import React from "react";
import { GiftedChat } from 'react-native-gifted-chat';
import Chatkit from "@pusher/chatkit";

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/44e39f10-6955-4ac7-bca1-201e2d8cccdb/token";
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:44e39f10-6955-4ac7-bca1-201e2d8cccdb";
const CHATKIT_ROOM_ID = "14669201";
const CHATKIT_USER_NAME = "Dave"; // Let's chat as "Dave" for this tutorial

export default class MyChat extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    // This will create a `tokenProvider` object. This object will be later used to make a Chatkit Manager instance.
    const tokenProvider = new Chatkit.TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    });

    // This will instantiate a `chatManager` object. This object can be used to subscribe to any number of rooms and users and corresponding messages.
    // For the purpose of this example we will use single room-user pair.
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: CHATKIT_USER_NAME,
      tokenProvider: tokenProvider
    });

    // In order to subscribe to the messages this user is receiving in this room, we need to `connect()` the `chatManager` and have a hook on `onNewMessage`. There are several other hooks that you can use for various scenarios. A comprehensive list can be found [here](https://docs.pusher.com/chatkit/reference/javascript#connection-hooks).
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.currentUser.subscribeToRoom({
        roomId: CHATKIT_ROOM_ID,
        hooks: {
          onNewMessage: message => alert(message.text)
        }
      });
    });
  }

  render() {
    return <GiftedChat messages={this.state.messages} />;
  }
}