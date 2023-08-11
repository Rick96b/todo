import {
    createSelector,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export type Task = {
    id: number;
    tasksList: string,
    title: string;
    completed: boolean;
}

export type OrderedTasks = Record<number, Task>;

const initialState: {
    data: OrderedTasks
} = {
    data: {}
}
  
export const taskModel = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        toggleTask: ({ data }, { payload: taskId }: PayloadAction<number>) => {
            data[taskId].completed = !data[taskId].completed;
        },
        addTask: ({data}, {payload: task}: PayloadAction<Task>) => {
            data[task.id] = task
        },
        setTasksList: (state, { payload }: PayloadAction<Task[]>) => {
            const tasksList: OrderedTasks = {}
            payload.forEach(task => tasksList[task.id] = task)
            state.data = tasksList;
        },
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

export const useTaskList = (listName: string) => 
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


export const { toggleTask, setTasksList, addTask } = taskModel.actions;

export const reducer = taskModel.reducer;