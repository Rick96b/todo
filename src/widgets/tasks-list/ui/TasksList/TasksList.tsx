import React, {useState} from 'react'
import classNames from 'classnames';

import { Task, taskModel } from 'entities/task';
import { ToggleTask } from 'features/toggle-task';
import styles from './TasksList.module.scss';
import { DeleteTask } from 'features/delete-task';


interface TaskListProps {
    data: taskModel.Task[]
}

const TaskList: React.FC<TaskListProps> = ({data}) => {
  const [taskHoverId, setTaskHoverId] = useState<number>();

  const handleTaskMouseOver = (taskId: number) => {
    setTaskHoverId(taskId)
  }

  const handleTaskMouseOut = (taskId: number) => {
    setTaskHoverId(-1);
  }

  return (
    <ul className={styles.taskList}>
        {
          data.map(task => 
            <li className={classNames(styles.task, task.completed ? styles.taskCompleted : '')}
              onMouseOver={() => handleTaskMouseOver(task.id)}
              onMouseOut={() => handleTaskMouseOut(task.id)}
            >
              <ToggleTask task={task} />
              <div className={task.completed ? styles.taskContentCompleted : ''}>
                <Task data={task}/>   
              </div>
              {
                taskHoverId === task.id &&
                <div className={styles.deleteTask}>
                  <DeleteTask task={task}/>
                </div> 
              }         
            </li>
          )

        }
    </ul>
  )
}

export default TaskList;
