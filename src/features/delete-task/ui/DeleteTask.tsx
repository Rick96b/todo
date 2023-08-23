import React from 'react'
import {IconButton} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { taskModel } from 'entities/task';
import { useDispatch } from 'react-redux';

interface DeleteTaskProps {
    task: taskModel.Task
}

const DeleteTask: React.FC<DeleteTaskProps> = ({task}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(taskModel.deleteTask(task))
    }

    return (
        <IconButton 
            aria-label='Delete task' 
            onClick={() => handleDelete()}
            sx={{
                color: 'var(--color-red)'
            }}
            >
            <CloseOutlinedIcon/>
        </IconButton>
    )
}

export default DeleteTask;
