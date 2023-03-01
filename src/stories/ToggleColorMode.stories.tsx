import React from 'react';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';
import {ToggleColorMode} from '../ToggleColorMode';

export default {
    title: 'ToggleColorMode',
    component: ToggleColorMode,
    decorators: [ReduxStoreProviderDecorator],
}

const ToggleColorModeTemplate = () => <ToggleColorMode/>
