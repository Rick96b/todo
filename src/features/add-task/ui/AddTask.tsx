import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField/TextField';
import Modal from 'shared/ui/Modal';

import { taskModel } from 'entities/task';
import styles from './AddTask.module.scss';

interface AddTaskProps {
  tasksListName: string;
} 

const AddTask: React.FC<AddTaskProps> = ({tasksListName}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [taskError, setTaskError] = useState('');
  
  const dispatch = useDispatch();
  const allTasksData = taskModel.useAllTasks();

  const handleClose = () => {
    setModalOpen(false);
  }

  const handleOpen = () => {
    setModalOpen(true);
  }

  const handleSubmit = () => { 
    if(!taskText) {
      setTaskError('Empty field!')
      return;
    }

    const newTask: taskModel.Task = {
      id: allTasksData.length + 1,
      tasksList: tasksListName,
      title: taskText,
      completed: false
    } 

    dispatch(taskModel.addTask(newTask))
    setTaskText('');
    handleClose()
  }

  const actions = [
    <Button
      type="submit" 
      form="taskCreateForm"  
      onClick={() => handleSubmit()}
      sx={{
        color: 'var(--color-red)'
      }}
    >
      Save
    </Button>,
  ];

  return (
    <>
      <IconButton className={styles.button} 
        aria-label='Add task' 
        onClick={() => handleOpen()}
      >
        <AddIcon className={styles.icon}/>
      </IconButton>
      <Modal 
        openState={isModalOpen} 
        handleClose={handleClose}
        title='Add task'
        actions={actions}
      >
        <TextField 
          id="addTask" 
          label="Add task" 
          variant="outlined" 
          error={!!taskError}
          helperText={taskError}
          autoFocus={true}
          value={taskText} 
          onChange={(event) => setTaskText(event.target.value)}
        />
      </Modal>
    </>
  )
}

export default AddTask;
