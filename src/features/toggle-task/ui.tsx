import React from 'react'
import { Checkbox } from '@mui/material';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux';

import { taskModel } from 'entities/task';


interface ToggleTaskProps {
    taskId: number;
}

const ToggleTask: React.FC<ToggleTaskProps> = ({taskId}) => {
    const dispatch = useDispatch();
    const task = taskModel.useTask(taskId);

    if (!task) return null;

    const onToggle = () => dispatch(taskModel.toggleTask(taskId));

    return (
        <Checkbox
            onChange={onToggle}
            checked={task.completed}
            sx={{
                color: red[800],
                '&.Mui-checked': {
                  color: red[600],
                },
            }}
        />
    )
}

export default ToggleTask;
