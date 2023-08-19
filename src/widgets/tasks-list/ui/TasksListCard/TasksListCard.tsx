import React from 'react'

import { taskModel } from 'entities/task';
import styles from './TasksListCard.module.scss';
import classNames from 'classnames';
import { ToggleTask } from 'features/toggle-task';
import { Task } from 'entities/task';


interface TasksListCardProps {
  tasksListName: string;
  tasksData: taskModel.Task[];
}

const TasksListCard: React.FC<TasksListCardProps> = ({tasksListName, tasksData}) => {
  return (
    <article className={styles.tasksListCard}>
      <header className={styles.header}>
        <h2 className={styles.title}>{tasksListName}</h2>
      </header>
      <main className={styles.main}>
        <ul className={styles.tasksList}>
          {tasksData.map(task => 
            <li className={classNames(styles.task, task.completed ? styles.taskCompleted : '')}>
              <ToggleTask isDisabled={true} task={task} color='white'/>
              <div className={task.completed ? styles.taskContentCompleted : ''}>
                <Task data={task}/>   
              </div>
            </li>
          )}
        </ul>
      </main>
    </article>
  )
}

export default TasksListCard;