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

const initialState: {
    data: OrderedTasks
    tasksLists: string[]
} = {
    data: {},
    tasksLists: []
}

export const taskModel = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        toggleTask: ({ data }, { payload: taskId }: PayloadAction<number>) => {
            data[taskId].completed = !data[taskId].completed;
        },
        addTask: ({ data }, { payload: task }: PayloadAction<Task>) => {
            data[task.id] = task
        },
        setData: (state, { payload }: PayloadAction<Task[]>) => {
            const orderedData: OrderedTasks = {}
            payload.forEach(task => orderedData[task.id] = task)
            state.data = orderedData;
        },
        setTasksLists: (state, { payload: tasksList }: PayloadAction<string[]>) => {
            state.tasksLists = tasksList
        },
        addTasksList: ({ tasksLists }, { payload }: PayloadAction<string>) => {
            tasksLists.push(payload)
        }
    },
});

export const useTask = (taskId: number) =>
  useSelector(
    createSelector(
        (state: RootState) => state.tasks.data,
        (tasks: RootState["tasks"]["data"]) => {
            return tasks[taskId]
        }
    )
  );

export const useTasksList = (listName: string) => 
    useSelector(
        createSelector(
          (state: RootState) => state.tasks.data,
          (
            tasks: RootState["tasks"]["data"]
          ) =>
            Object.values(tasks).filter(task => task.tasksList === listName)
        )
    )

export const useAllTasks = () => 
    useSelector(
        createSelector(
          (state: RootState) => state.tasks.data,
          (
            tasks: RootState["tasks"]["data"]
          ) =>
            Object.values(tasks)
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



export const { toggleTask, setData, addTask, addTasksList, setTasksLists} = taskModel.actions;

export const reducer = taskModel.reducer;