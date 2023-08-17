import React from 'react'
import { Container, IconButton } from '@mui/material';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';

import styles from './HomePage.module.scss'
import { AddTasksList } from 'features/add-tasks-list';
import { TasksListCard } from 'widgets/tasks-list';
import { taskModel } from 'entities/task';


const HomePage: React.FC = () => {
  const fullData = taskModel.useAllData();
  console.log(fullData)

  return (
    <div className={styles.homePage}>
        <header className={styles.header}>
            <Brightness5OutlinedIcon />
        </header>
        <main>
            <b className={styles.title}>Tasks <span>Lists</span></b>
            <div className={styles.addTaskListContainer}>
              <AddTasksList />
            </div>
            <div className={styles.tasksListsContainer}>
              {fullData.tasksLists.map(tasksListName => 
                <TasksListCard tasksListName={tasksListName} tasksData={Object.values(fullData.data).filter(task => task.tasksList === tasksListName)}/>
              )}
            </div>
        </main>
    </div>
  )
}

export default HomePage;