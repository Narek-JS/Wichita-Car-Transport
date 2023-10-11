import { Blog } from "@/components/postWrapper/Blog";
import { CurrentNew } from "@/components/postWrapper/New";
import { LoadingUI } from "@/components/ui/LoadingUI";
import { getCurrentPageData } from "@/constants/service";
import { Redirect } from "@/components/Redirect";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import NotFound from './404';

const DynamicPage: React.FC = () => {
    const { query: { dynamicPage: slug } } = useRouter();
    const { isLoading, data } = useQuery<any>(
        ['dynamicData', slug],
        getCurrentPageData(String(slug)),
        { enabled: Boolean(slug) }
    );

    if(slug === 'home') return <Redirect to="/"/>;

    if(isLoading) return <LoadingUI type="fullPage" />;

    if(data?.data?.post?.category.name === 'Blogs') return <Blog slug={String(slug)} data={data.data} />;

    if(data?.data?.post?.category.name === 'News') return <CurrentNew slug={String(slug)} data={data.data} />;

    return <NotFound />;
};

export default DynamicPage;