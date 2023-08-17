import React from 'react'
import { Container, IconButton } from '@mui/material';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';

import styles from './HomePage.module.scss'
import { AddTasksList } from 'features/add-tasks-list';
import { TasksListCard } from 'widgets/tasks-list';
import { taskModel } from 'entities/task';

interface HomePageProps {
  tasksData: taskModel.Task[]
}

const HomePage: React.FC<HomePageProps> = ({tasksData}) => {
  const sortedTasksData = tasksData

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
              <TasksListCard tasksListName='Hehe' tasksData={[{
                id: 1,
                tasksList: 'My Tasks',
                title: 'Fuck',
                completed: false
              },
              {
                  id: 2,
                  tasksList: 'My Tasks',
                  title: 'Nikita loh',
                  completed: true
              }]}/>
            </div>
        </main>
    </div>
  )
}

export default HomePage;