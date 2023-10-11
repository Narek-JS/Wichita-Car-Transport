import { LATEST_BLOGS_URL, LATEST_NEWS_URL, SEARCH_URL, getBlogsApi, getCurrentPageDataApi, getNewsApi } from "./api";

// POST Search
export const sendSearch = (postData: { text: string; page: number }) => fetch(SEARCH_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
});

// GET News;
export const getNews = (page: number) => () => fetch(getNewsApi(page)).then(res =>res.json()); 

// GET Blogs;
export const getBlogs = (page: number) => () => fetch(getBlogsApi(page)).then(res =>res.json()); 

// GER data with slug for dynamic pages
export const getCurrentPageData = (slug: string) => () => fetch(getCurrentPageDataApi(slug)).then(res => res.json());

export const getLatestBlogsBlog = (limit: number) => {
    return () => fetch(LATEST_BLOGS_URL+limit).then(res =>res.json());
};

export const getLatestNewsNew = (limit: number) => {
    return () => fetch(LATEST_NEWS_URL+limit).then(res =>res.json());
};