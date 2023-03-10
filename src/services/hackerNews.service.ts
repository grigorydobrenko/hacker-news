import httpService from "./http.service";

export const hackerNewsService = {
    fetchIds() {
        return httpService.get('/newstories.json?print=pretty')
    },
    fetchNews(id: number) {
        return httpService.get(`/item/${id}.json?print=pretty`)
    },

    fetchComments(id: number) {
        return httpService.get(`/item/${id}.json?print=pretty`)
    }
}