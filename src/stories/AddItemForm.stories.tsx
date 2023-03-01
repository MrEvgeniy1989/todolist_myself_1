import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {AddItemForm} from '../AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'AddItemForm',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const callback = action(`Button 'add' was pressed inside the form`)

export const AddItemFormExample: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm callback={callback}/>;
