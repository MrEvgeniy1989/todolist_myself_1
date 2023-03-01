import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from '../AddItemForm';
import {action} from '@storybook/addon-actions';
import {Task} from '../Task';

export default {
    title: 'Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action(`Status changed inside Task`)
const changeTaskTitleCallback = action(`Title changed inside Task`)
const removeTaskCallback = action(`Remove button inside Task was clicked`)

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

export const TaskExample: ComponentStory<typeof Task> = (args) => <Task {...args}/>
TaskExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'REACT', isDone: false},
    todolistId: 'todolistId1'
}
