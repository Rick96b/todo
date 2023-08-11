import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField/TextField';
import Modal from 'shared/ui/Modal';

import { taskModel } from 'entities/task';
import styles from './AddTask.module.scss';

interface AddTaskProps {
  tasksListName: string
}

const AddTask: React.FC<AddTaskProps> = ({tasksListName}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskText, setTaskText] = useState('');
  
  const dispatch = useDispatch();
  const allTasksData = taskModel.useAllTasks();

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleSubmit = () => { 
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
    >
      Save
    </Button>,
  ];

  return (
    <>
    <IconButton className={styles.button} aria-label='Add task' onClick={() => handleOpen()}>
      <AddIcon className={styles.icon}/>
    </IconButton>
    <Modal 
      openState={isOpen} 
      handleClose={handleClose}
      title='Add task'
      actions={actions}
    >
      <TextField 
        id="outlined-basic" 
        label="Outlined" 
        variant="outlined" 
        autoFocus 
        value={taskText} 
        onChange={(event) => setTaskText(event.target.value)}
      />
    </Modal>
    </>
  )
}

export default AddTask;
