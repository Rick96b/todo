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
        },
        addTask: ({ data }, { payload: task }: PayloadAction<Task>) => {
            data[task.tasksList][task.id] = task
        },
        setData: (state, { payload }: PayloadAction<ListedTasks>) => {
            state.data = payload;
        },
        addTasksList: (state, { payload }: PayloadAction<string>) => {
            state.data[`${payload}`] = {};
        }
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



export const { toggleTask, setData, addTask, addTasksList} = taskModel.actions;

export const reducer = taskModel.reducer;