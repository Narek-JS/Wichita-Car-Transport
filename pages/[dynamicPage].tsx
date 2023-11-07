import { IDynamicContentFromAdmin, IDynamicPageData, IPostData } from "@/model/dynamicPage";
import { DynamicContentFromAdmin } from "@/components/DynamicContentFromAdmin";
import { useGetDynamicPageDataQuery } from "@/store/dynamicPage";
import { DynamicRoute } from "@/components/DynamicRoute";
import { LoadingUI } from "@/components/ui/LoadingUI";
import { Redirect } from "@/components/Redirect";
import { Post } from "@/components/Posts/Post";
import { useRouter } from "next/router";

const DynamicPage: React.FC = () => {
    const { query: { dynamicPage: slug } } = useRouter();

    const { isLoading, isError, data } = useGetDynamicPageDataQuery(String(slug), {
        skip: !slug
    });

    if(slug === 'home') return <Redirect to="/" />;
    if(isError) return <Redirect to="/404" />;

    if(isLoading) return <LoadingUI type="fullPage" />;

    if(data && 'categoryName' in data) {
        if(data?.categoryName === 'Blogs') {
            const dataT: IPostData = data as any;
            return <Post data={dataT} />;
        };
        if(data?.categoryName === 'News') {
            const dataT: IPostData = data as any;
            return <Post data={dataT} />;
        };
    };

    if(data && 'category' in data) {
        if(data?.category === "dynamic-route") {
            const dataT: IDynamicPageData = data as IDynamicPageData;
            return <DynamicRoute {...dataT} />
        };

        if(data?.category === "dynamic-content-from-admin") {
            const dataT: IDynamicContentFromAdmin = data as IDynamicContentFromAdmin;
            return <DynamicContentFromAdmin {...dataT} />
        };
    };

    return <Redirect to="/404"/>;
};

export default DynamicPage;