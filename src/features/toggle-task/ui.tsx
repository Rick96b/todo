import React from 'react'
import { Checkbox } from '@mui/material';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux';

import { taskModel } from 'entities/task';


interface ToggleTaskProps {
    task: taskModel.Task;
    color?: 'white' | 'red';
}

const ToggleTask: React.FC<ToggleTaskProps> = ({task, color='red'}) => {
    const dispatch = useDispatch();

    if (!task) return null;

    const onToggle = () => dispatch(taskModel.toggleTask(task));

    return (
        <Checkbox
            onChange={onToggle}
            checked={task.completed}
            sx={{
                color: color === 'red' ? '#e53935' : '#fff',
                '&.Mui-checked': {
                  color: color === 'red' ? '#e53935' : 'rgba(255, 255, 255, 0.3)',
                },
            }}
        />
    )
}

export default ToggleTask;
