import React from 'react'
import { Box, CircularProgress, Container, IconButton } from '@mui/material';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { TasksList } from 'widgets/tasks-list';
import { taskModel } from 'entities/task';
import { AddTask } from 'features/add-task';
import styles from './TasksListPage.module.scss';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


const TasksListPage: React.FC = () => {
  const {tasksList} = useParams() as { tasksList: string };
  const data = taskModel.useTasksList(tasksList);
  const completedTasks = data.filter(task => task.completed)

  return (
    <Container maxWidth="md" className={styles.tasksPage}>
      <header className={styles.header}>
        <Brightness5OutlinedIcon />
        <Link to='/'>
          <IconButton>
            <CloseOutlinedIcon />
          </IconButton>
        </Link>
      </header>
      <main>
        <div className={styles.info}>
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
        </div>
        <TasksList data={data} />
        <div className={styles.addTaskButton}>
          <AddTask tasksListName={tasksList}/>
        </div>
      </main>
    </Container>
  )
}

export default TasksListPage;
