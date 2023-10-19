export const BLOGS_LIMIT = 2;
export const BLOG_CATEGORY = 1;
export const NEW_LIMIT = 2;
export const NEW_CATEGORY = 2;
export const HOME_CATEGORY_ARTICLES = 0;
export const HOME_CATEGORY_LIMIT = 1;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const MANU_URL = BASE_URL + '/menus';

export const SEARCH_URL = BASE_URL + 'search'; // Api Search;

export const getNewsApi = (page: number) => BASE_URL  + `category?slug=news&page=${page}`; // Api endpoint for News list on specific page;

export const getBlogsApi = (page: number) => BASE_URL  + `category?slug=blogs&page=${page}`; // Api endpoint for Blog list on specific page;

export const getCurrentPageDataApi = (slug: string) => BASE_URL + `getDynamicData/${slug}`; // Api for dynamic pages

export const LATEST_BLOGS_URL = BASE_URL + `getLast2Data?category=${BLOG_CATEGORY}&limit=`; // Api Latest Blogs;
export const LATEST_NEWS_URL = BASE_URL + `getLast2Data?category=${NEW_CATEGORY}&limit=`; // Api Latest News;