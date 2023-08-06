import { Task } from "entities/task";
import { ToggleTask } from "features/toggle-task";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { taskModel } from 'entities/task';

export const Routing = () => {
    const dispatch = useDispatch();
    dispatch(taskModel.setTasksList([{
        id: 1,
        title: 'Fuck',
        completed: false
    }]))
    return (
        <Routes>
            <Route path="/" element={
            <>
                <ToggleTask taskId={1}/>
                <Task data={{
                    id: 1,
                    title: 'Fuck',
                    completed: false
                }} />
            </>} 
            />
        </Routes>
    );
};