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

export const fetchSingleNews = createAsyncThunk('app/fetchSingleNews', async (id: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({status: 'loading'}))
            const result = await hackerNewsService.fetchNews(+id)
            const currentNews = result.data
            console.log(currentNews)
            if (currentNews.descendants !== 0) {
                console.log(currentNews.kids)
                thunkAPI.dispatch(fetchComments(currentNews.kids))
            }
            return {currentNews}

        } catch (e) {
            errorHandlerUtil(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        } finally {
            thunkAPI.dispatch(setAppStatus({status: 'idle'}))
        }
    }
)

export const fetchComments = createAsyncThunk('app/fetchComments', async (kids: number[], thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({status: 'loading'}))
            const commentsResult = await Promise.all(kids.map((item: number) => hackerNewsService.fetchComments(item)))
            const comments = commentsResult.map((result) => result.data)
            console.log(comments)
            return {comments}

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
        news: [] as NewsType[] | null,
        currentNews: {} as NewsType | null,
        comments: [] as CommentType[] | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            state.news = action.payload.news
        })
        builder.addCase(fetchSingleNews.fulfilled, (state, action) => {
            state.currentNews = action.payload.currentNews
        })
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload.comments
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

export type CommentType = Omit<NewsType, 'descendants' | 'url' | 'title' | 'score'> & {parent: number, text: string}