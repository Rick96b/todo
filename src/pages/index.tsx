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
        dispatch(taskModel.setData())
    }, [])


    return (
        <Routes>
            <Route path="/list/:tasksList" element={<TasksListPage />}/> 
            <Route path="/" element={<HomePage />}/>
        </Routes>
    );
};