import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: {message: ''} as ErrorType,
    },
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ message: string }>) {
            state.error = action.payload
        }
    },
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = { message: string }