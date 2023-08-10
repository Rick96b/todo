import React from 'react'
import { CircularProgress } from '@mui/material';

import styles from './TasksListPage.module.scss';
import { TasksList } from 'widgets/tasks-list';
import { taskModel } from 'entities/task';
import { AddTask } from 'features/add-task';

interface TasksListPageProps {
  listName: string,
  data: taskModel.Task[]
}

const TasksListPage: React.FC<TasksListPageProps> = ({listName, data}) => {
  const completedTasks = data.filter(task => task.completed)

  return (
    <div className={styles.tasksPage}>
      <div className={styles.info}>
        <CircularProgress 
          variant="determinate" 
          value={completedTasks.length / data.length * 100}
          className={styles.progress}
        />
        <p className={styles.infoContainer}>
          <h2 className={styles.listName}>{listName}</h2>
          <span className={styles.tasksCount}>{`${completedTasks.length} of ${data.length} tasks`}</span>
        </p>
      </div>
      <TasksList data={data} />
      <AddTask />
    </div>
  )
}

export default TasksListPage;
