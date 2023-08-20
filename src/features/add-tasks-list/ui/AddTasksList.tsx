import React, { useState } from 'react'
import { IconButton, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';

import { taskModel } from 'entities/task';
import Modal from 'shared/ui/Modal';
import styles from './AddTasksList.module.scss';

interface AddTasksListProps {

}

const AddTasksList: React.FC<AddTasksListProps> = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [tasksListName, setTasksListName] = useState('');

    const dispatch = useDispatch();
    const allTasksData = taskModel.useAllTasks();

    const handleClose = () => {
        setModalOpen(false);
    }

    const handleOpen = () => {
        setModalOpen(true);
    }

    const handleSubmit = () => { 
        dispatch(taskModel.addTasksList(tasksListName))
        setTasksListName('');
        handleClose()
    }
    

    const actions = [
        <Button
          type="submit" 
          form="taskCreateForm"  
          onClick={() => handleSubmit()}
          sx={{
            color: 'var(--color-red)',
          }}
        >
          Save
        </Button>,
    ];
  
    return (
        <>
        <div className={styles.addTaskContainer}>
            <IconButton className={styles.button} aria-label='Add tasks list' onClick={() => handleOpen()}>
                <AddIcon className={styles.icon}/>
            </IconButton>
            <span className={styles.text}>Add List</span>
        </div>
        <Modal 
            openState={isModalOpen} 
            handleClose={handleClose}
            title='Add List'
            actions={actions}
        >
            <TextField 
                id="addList" 
                label="Add list" 
                variant="outlined" 
                autoFocus 
                value={tasksListName} 
                onChange={(event) => setTasksListName(event.target.value)}
            />
        </Modal>
            </>
    )
}

export default AddTasksList;