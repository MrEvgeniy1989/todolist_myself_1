import React from 'react';
import {AppWithRedux} from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof AppWithRedux>

const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux/>;

export const AppWithReduxExample = Template.bind({})