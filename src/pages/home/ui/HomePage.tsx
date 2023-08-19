import React from 'react'
import { Container, IconButton } from '@mui/material';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';

import styles from './HomePage.module.scss'
import { AddTasksList } from 'features/add-tasks-list';
import { TasksListCard } from 'widgets/tasks-list';
import { taskModel } from 'entities/task';
import { Link } from 'react-router-dom';


const HomePage: React.FC = () => {
  const fullData = taskModel.useAllData().data;
  const tasksList = Object.values(fullData).map(taskList => Object.values(taskList)).flat(1)
  console.log(tasksList)

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
            <ul className={styles.tasksListsContainer}>
              {Object.keys(fullData).map(tasksListName => 
                <li className={styles.tasksListsItem}>
                  <Link to={'/list/' + tasksListName}>
                    <TasksListCard tasksListName={tasksListName} tasksData={tasksList.filter(task => task.tasksList === tasksListName)}/>
                  </Link>
                </li>
              )}
            </ul>
        </main>
    </div>
  )
}

export default HomePage;