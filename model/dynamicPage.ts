export interface IDynamicPageData {
    category: string;
    title: string;
    pageName: string;
    content: Array<{
        id: number;
        image?: string;
        text?: string;
        subTitle?: string;
    }>
};

export interface IDynamicContentFromAdmin {
    category: string;
    title: string;
    content: string;
};

export interface IRelatedPost {
    id: number;
    image: string;
    slug: string;
    title: string;
    date: string;
    categoryName: string;
    categoryId: number;
};

export interface IPostData {
    content: string;
    categoryName: string;
    categoryId: number;
    id: number;
    image: string;
    slug: string;
    status: string;
    title: string;
    date: string;
    post_comment: Array<any>;
    relatedPosts: Array<IRelatedPost>;
};

export class DynamicPageAdapter {
    constructor() {};
  
    static createPostData(data: any, relatedPosts: any): IPostData {
        return {
            content: data?.body || '',
            categoryName: data?.category?.name || '',
            categoryId: data?.category_id,
            id: data?.id,
            image: data?.image || '',
            slug: data?.slug || '',
            status: data?.status || '',
            title: data?.title || '',
            date: data?.updated_at || '',
            post_comment: data?.post_comment || [],
            relatedPosts: (relatedPosts || []).map(((post, index) => ({
                id: post?.id || index,
                image: post?.image || '',
                slug: post?.slug || '',
                title: post?.title || '',
                date: post?.updated_at || '',
                categoryName: post?.category?.name || '',
                categoryId: post?.category_id
            })))
        };
    };

    static createDynamicContentFromAdmin(data: any): IDynamicContentFromAdmin {
        return {
            category: data?.category?.value || '',
            title: data?.title?.value || '',
            content: data?.content?.value || '',
        };
    };

    static createDynamicPageData(data: any): IDynamicPageData {

        return {
            category: data?.category?.value || '',
            title: data?.title?.value || '',
            pageName: data?.title?.group || '',
            content: data?.content?.map((contentItem, index) => {
                return {
                    id: contentItem?.text?.id || index,
                    ...(contentItem?.text && { text: contentItem?.text?.value }),
                    ...(contentItem?.Image && { image: contentItem?.Image.page_image?.[0]?.image }),
                    ...(contentItem?.sub_title && { subTitle: contentItem?.sub_title?.value })
                }
            })
        };
    }
};