import { useRouter } from "next/router";
import { NextPage } from "next";
import { LINKS_FROM_MENU_TITLES } from "@/constants/words";
import { useGetMenusQuery } from "@/store/manu";
import Blogs from "./Blogs";
import News from "./News";

const PostWrapper: NextPage = () => {
    const { pathname } = useRouter();
    const { data } = useGetMenusQuery('menus');

    if(pathname === '/' + data?.contactInfo?.[LINKS_FROM_MENU_TITLES.blogs].url) return <Blogs />;
    if(pathname === '/' + data?.contactInfo?.[LINKS_FROM_MENU_TITLES.news].url) return <News />;

    return null;
};

export { PostWrapper };
