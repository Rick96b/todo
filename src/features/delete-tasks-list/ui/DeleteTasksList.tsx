import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useDispatch } from 'react-redux';
import { taskModel } from 'entities/task';
import { Link } from 'react-router-dom';

interface DeleteTasksListProps {
    tasksList: string
}

const DeleteTasksList: React.FC<DeleteTasksListProps> = ({tasksList}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(taskModel.deleteTasksList(tasksList))
    }

    return (
        <Link to='/'>
            <IconButton
                aria-label='Delete list' 
                onClick={handleClick}
                sx={{
                    color: 'var(--color-red)'
                }}  
            >
                <DeleteIcon />
            </IconButton>
        </Link>
    )
}

export default DeleteTasksList;
