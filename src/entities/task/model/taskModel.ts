import {
    createSelector,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export type Task = {
    id: number;
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
        setTasksList: (state, { payload }: PayloadAction<Task[]>) => {
            let taskList: OrderedTasks = {};
            payload.forEach(task => taskList[task.id] = task)
            state.data = taskList;
        },
    },
});

export const useTask = (taskId: number) =>
  useSelector(
    createSelector(
      (state: RootState) => state.tasks.data,
      (tasks) => tasks[taskId]
    )
  );


export const { toggleTask, setTasksList } = taskModel.actions;

export const reducer = taskModel.reducer;