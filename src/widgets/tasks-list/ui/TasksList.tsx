import React from 'react'
import classNames from 'classnames';

import { Task, taskModel } from 'entities/task';
import { ToggleTask } from 'features/toggle-task';
import styles from './TasksList.module.scss';


interface TaskListProps {
    data: taskModel.Task[]
}

const TaskList: React.FC<TaskListProps> = ({data}) => {
  console.log(data)
  return (
    <ul className={styles.taskList}>
        {
          data.map(task => 
            <li className={classNames(styles.task, task.completed ? styles.taskCompleted : '')}>
              <ToggleTask taskId={task.id} />
              <div className={task.completed ? styles.taskContentCompleted : ''}>
                <Task data={task}/>   
              </div>
            </li>
          )

        }
    </ul>
  )
}

export default TaskList;
