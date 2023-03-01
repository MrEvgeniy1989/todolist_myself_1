import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from '../EditableSpan';

export default {
    title: 'EditableSpan',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const callback = action(`EditableSpan value changed`)

export const AddItemFormExample: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan title={'React'} callback={callback}/>;
