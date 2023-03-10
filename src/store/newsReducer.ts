import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {hackerNewsService} from "../services/hackerNews.service";
import {setAppStatus} from "./appReducer";
import {errorHandlerUtil} from "../utils/errors-utils";

export const fetchNews = createAsyncThunk('app/fetchNews', async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({status: 'loading'}))
            const idsResult = await hackerNewsService.fetchIds()
            const ids = idsResult.data.splice(0, 100)

            const newsResult = await Promise.all(ids.map((item: number) => hackerNewsService.fetchNews(item)))
            const news = newsResult.map((result) => result.data)
            return {news}
        } catch (e) {
            errorHandlerUtil(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        } finally {
            thunkAPI.dispatch(setAppStatus({status: 'idle'}))
        }
    }
)

export const slice = createSlice({
    name: 'news',
    initialState: {
        news: [] as NewsType[] | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            state.news = action.payload.news
        })

    }
})

export const newsReducer = slice.reducer

export type NewsType = {
    by: string,
    descendants: number,
    id: number,
    kids: number[],
    score: number,
    time: number,
    title: string,
    type: string,
    url: string
}