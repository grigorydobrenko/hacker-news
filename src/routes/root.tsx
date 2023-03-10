import {createBrowserRouter} from "react-router-dom";
import App from "../App/App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MainPage from "../pages/MainPage/MainPage";
import NewsPage from "../pages/NewsPage/NewsPage";


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: (
            <main style={{padding: '1rem'}}>
                <ErrorPage/>
            </main>
        ),
        children: [
            {
                path: '/',
                element: <MainPage/>,
            },
            {
                path: '/:id',
                element: <NewsPage/>,
            },
        ]
    }])