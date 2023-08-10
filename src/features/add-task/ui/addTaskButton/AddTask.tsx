import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

import styles from './AddTask.module.scss';

const AddTask = () => {
  return (
    <IconButton className={styles.button}>
      <AddIcon className={styles.icon}/>
    </IconButton>
  )
}

export default AddTask;
