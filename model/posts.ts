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

export interface IPostComment {
    name: string;
    email: string;
    phone: string;
    comments: string;
};

export interface IPosts {
    data: Array<IPost>;
    currentPage: string;
    pageCount: number;
};

export class Posts {
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

    static createPostsData(data: any): IPosts {
        return {
            currentPage: data?.data?.currentPage,
            pageCount: data?.data?.pageCount,
            data: this.getPosts(data?.data?.posts || [])
        };
    };
}