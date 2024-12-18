import  AppWithRedux from "./AppWithRedux";
import React from 'react';
import { action } from "@storybook/addon-actions";
import { Provider } from "react-redux";
import store from "./state/store";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export default {
  title: 'AppWithRedux Component',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
}



export const AppWithReduxBaseExample = () => {
return <AppWithRedux />
}