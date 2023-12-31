import React from 'react'
import { Box, CircularProgress, IconButton } from '@mui/material';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { TasksList } from 'widgets/tasks-list';
import { taskModel } from 'entities/task';
import { AddTask } from 'features/add-task';
import styles from './TasksListPage.module.scss';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import BaseContainer from 'shared/ui/Container';
import { DeleteTasksList } from 'features/delete-tasks-list';


const TasksListPage: React.FC = () => {
  const {tasksList} = useParams() as { tasksList: string };
  const data = taskModel.useTasksList(tasksList);
  const completedTasks = data.filter(task => task.completed)

  return (
    <>
      <BaseContainer>
        <header className={styles.header}>
          <Brightness5OutlinedIcon />
          <Link to='/'>
            <IconButton>
              <CloseOutlinedIcon />
            </IconButton>
          </Link>
        </header>
      </BaseContainer>
      <main>
        <div className={styles.info}>
          <BaseContainer className={styles.infoCenterer}>
            <Box sx={{ position: 'relative', paddingTop: '10px' }}>
              <CircularProgress
                variant="determinate"
                sx={{
                  color: (theme) =>
                    theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={30}
                thickness={4}
                value={100}
              />
              <CircularProgress
                variant="determinate"
                sx={{
                  position: 'absolute',
                  left: 0,
                }}
                size={30}
                thickness={4}
                className={styles.progress}
                value={completedTasks.length / data.length * 100}
              />
            </Box>
            <p className={styles.infoContainer}>
              <b className={styles.listName}>{tasksList}</b>
              <span className={styles.tasksCount}>{`${completedTasks.length} of ${data.length} tasks`}</span>
            </p>
            <DeleteTasksList tasksList={tasksList}/>
          </BaseContainer>
        </div>
        <BaseContainer className={styles.tasksListCenterer}>
          <TasksList data={data} />
          <div className={styles.addTaskButton}>
            <AddTask tasksListName={tasksList}/>
          </div>
        </BaseContainer>
      </main>
    </>
  )
}

export default TasksListPage;
