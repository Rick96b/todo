import React from 'react'

import styles from './Task.module.scss';
import { Checkbox, FormControlLabel } from '@mui/material';

interface TodoItemProps {
  data: import("../model/taskModel").Task;
}

const Task: React.FC<TodoItemProps> = ({data}) => {
  return (
    <div className={styles.todo}>
      {data.title}
    </div>
  )
}

export default Task;
