import { Task } from "entities/task";
import { ToggleTask } from "features/toggle-task";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { taskModel } from 'entities/task';

const TasksListPage = lazy(() => import('./tasks-list').then((module) => ({ default: module.TasksListPage })));

export const Routing = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(taskModel.setTasksList([{
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
        }
        ]))
    }, [])


    const data = taskModel.useTaskList('My Tasks');
    return (
        <Routes>
            <Route path="/" element={<TasksListPage listName="My Tasks" data={data}/>}/>
        </Routes>
    );
};