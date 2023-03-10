import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {setAppError} from "../store/appReducer";

export const errorHandlerUtil = (e: any, dispatch: Dispatch) => {
    const err = e as AxiosError<RootError>
    if (err.response?.data) {
        dispatch(setAppError({message: err.response.data.error}))
    } else {
        dispatch(setAppError({message: err.message}))
    }
}

export type RootError = {
    error: string;
}