import { formatDate } from "@/helper/time";

export interface IPost {
    imagePath: string;
    categoryName: string;
    title: string;
    description: string;
    date: string;
    url: string;
    id: number,
    key: number
};

export interface IPosts {
    blogs: Array<IPost>;
    news: Array<IPost>;
};

export class LatestPosts {
    constructor() {};

    static getPosts(data: Array<Record<string, any>>): Array<IPost> {
        return data.map(post => ({
            categoryName: post?.category_id === 1 ? 'Blogs' : 'News',
            date: post?.created_at?.value ? formatDate(post?.created_at?.value) : '',
            description: post?.body || "",
            imagePath: post?.image || "",
            title: post?.title || "",
            url: post?.slug?.[0] === '/' ? post?.slug : '/' + post?.slug,
            id: post?.id,
            key: post?.id
        }));
    };

    static createLatestPostsData(data: any): IPosts {
        if(data?.data?.blogs && data?.data?.news) {
            return {
                blogs: this.getPosts(data?.data?.blogs || []),
                news: this.getPosts(data?.data?.news || [])
            };
        };
        return {
            blogs: this.getPosts((data?.data || []).filter(post => post.category_id === 1)),
            news: this.getPosts((data?.data || []).filter(post => post.category_id === 2))
        };
    };
}