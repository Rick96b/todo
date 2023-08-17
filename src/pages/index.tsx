import { Task } from "entities/task";
import { ToggleTask } from "features/toggle-task";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { taskModel } from 'entities/task';

const TasksListPage = lazy(() => import('./tasks-list').then((module) => ({ default: module.TasksListPage })));
const HomePage = lazy(() => import('./home').then((module) => ({ default: module.HomePage })));

export const Routing = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(taskModel.setData([{
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
        dispatch(taskModel.setTasksLists(['My Tasks']))
    }, [])


    const data = taskModel.useTasksList('My Tasks');
    return (
        <Routes>
            <Route path="/list" element={<TasksListPage listName="My Tasks" data={data}/>}/>
            <Route path="/" element={<HomePage />}/>
        </Routes>
    );
};