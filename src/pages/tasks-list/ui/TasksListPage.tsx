import React from 'react'
import { Box, CircularProgress, Container, IconButton } from '@mui/material';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { TasksList } from 'widgets/tasks-list';
import { taskModel } from 'entities/task';
import { AddTask } from 'features/add-task';
import styles from './TasksListPage.module.scss';

interface TasksListPageProps {
  listName: string,
  data: taskModel.Task[]
}

const TasksListPage: React.FC<TasksListPageProps> = ({listName, data}) => {
  const completedTasks = data.filter(task => task.completed)

  return (
    <Container maxWidth="md" className={styles.tasksPage}>
      <header className={styles.header}>
        <Brightness5OutlinedIcon />
        <IconButton>
          <CloseOutlinedIcon />
        </IconButton>
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
            <b className={styles.listName}>{listName}</b>
            <span className={styles.tasksCount}>{`${completedTasks.length} of ${data.length} tasks`}</span>
          </p>
        </div>
        <TasksList data={data} />
        <div className={styles.addTaskButton}>
          <AddTask tasksListName={listName}/>
        </div>
      </main>
    </Container>
  )
}

export default TasksListPage;
