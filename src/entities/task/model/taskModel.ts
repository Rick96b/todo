import {
    createSelector,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export type Task = {
    id: number;
    tasksList: string;
    title: string;
    completed: boolean;
}

export type OrderedTasks = Record<number, Task>;
export type ListedTasks = Record<string, OrderedTasks>;

const initialState: {
    data: ListedTasks
} = {
    data: {},
}

export const taskModel = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        toggleTask: ({ data }, { payload: task }: PayloadAction<Task>) => {
            data[task.tasksList][task.id].completed = !data[task.tasksList][task.id].completed
            localStorage.setItem(task.tasksList, JSON.stringify(Object.values(data[task.tasksList])))
        },
        addTask: ({ data }, { payload: task }: PayloadAction<Task>) => {
            data[task.tasksList][task.id] = task
            localStorage.setItem(task.tasksList, JSON.stringify(Object.values(data[task.tasksList])))
        },
        deleteTask: ({ data }, { payload: task }: PayloadAction<Task>) => {
            delete data[task.tasksList][task.id]
            localStorage.setItem(task.tasksList, JSON.stringify(Object.values(data[task.tasksList])))
        },
        setData: (state, {  }: PayloadAction) => {
            const orderedData: ListedTasks = {}
            for(let i = 0; i < localStorage.length; i++) {
                const tasksList = localStorage.key(i);
                if(tasksList) {
                    orderedData[tasksList] = {};
                    const tasks: Task[] = JSON.parse(localStorage.getItem(tasksList) || '')
                    tasks.forEach((task: Task) => {
                        console.log(tasksList, task)
                        orderedData[tasksList][task.id] = task
                    });    
                }   
            }
            state.data = orderedData;
        },
        addTasksList: (state, { payload }: PayloadAction<string>) => {
            state.data[payload] = {};
            localStorage.setItem(payload, '[]')
        },
        deleteTasksList: (state, { payload }: PayloadAction<string>) => {
            delete state.data[payload];
            localStorage.removeItem(payload)
        },
    },
});

export const useTask = (task: Task) =>
  useSelector(
    createSelector(
        (state: RootState) => state.tasks.data,
        (tasks: RootState["tasks"]["data"]) => {
            return tasks[task.tasksList][task.id]
        }
    )
  );

export const useTasksList = (tasksList: string) =>
  useSelector(
    createSelector(
        (state: RootState) => state.tasks.data,
        (tasks: RootState["tasks"]["data"]) => {
            return tasks[tasksList] ? Object.values(tasks[tasksList]) : []
        }
    )
  );

export const useAllTasks = () => 
    useSelector(
        createSelector(
          (state: RootState) => state.tasks.data,
          (
            tasks: RootState["tasks"]["data"]
          ) =>
            Object.values(tasks).map(taskList => Object.values(taskList)).flat(1)
        )
    )

export const useAllData = () => 
    useSelector(
        createSelector(
          (state: RootState) => state.tasks,
          (
            tasks: RootState["tasks"]
          ) =>
            tasks
        )
    )



export const { toggleTask, setData, addTask, deleteTask, addTasksList, deleteTasksList} = taskModel.actions;

export const reducer = taskModel.reducer;