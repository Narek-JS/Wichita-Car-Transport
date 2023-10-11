import { getMenuItemsWithChildeFormat } from "@/helper/menu";

type SocialGroup = {
    id: number;
    title: string;
    url: string;
}

export interface MenuItem {
    id?: number;
    menu_id?: number;
    title?: string;
    url?: string;
    order?: number;
    parent_id?: number | null;
    children?: Array<MenuItem>;
};

export interface IContactInfo {
    title: string,
    id: number,
    url: string
};

export interface IMenuData {
    logo: string;
    social: Array<SocialGroup>;
    items: Array<MenuItem>;
    allItems: Array<MenuItem>;
    topHeaderCenterItems: Array<MenuItem>;
    topHeaderLeftItem: MenuItem | null;
    topHeaderRightItem: MenuItem | null;
    contactInfo: Record<string, IContactInfo>; 
};

export class MenuAdapter {
    constructor() {};
  
    static createMenuData(data: any): IMenuData {
        const allItems = getMenuItemsWithChildeFormat(data?.items || []);
        const topHeaderItems = allItems.find(item => item.title === 'Top Header')?.children || [];
        const items = allItems.filter((item) => item.title !== 'Top Header') || [];
        const topHeaderCenterItems = topHeaderItems.find(item => item.title === 'Center')?.children || [];
        const contactInfo = data.items.reduce((acc, item) => {
            acc[item.title] = {
                title: item.title,
                id: item.id,
                url: item.url
            };
            return acc;
        }, {});
        return {
            logo: data?.logo || '/assets/images/logo.png',
            social: (data?.social?.items || []).map((socialItem, index): SocialGroup => ({
                id: socialItem?.id || index,
                title: socialItem?.title || '',
                url: socialItem?.url || '',
            })),
            items,
            contactInfo,
            allItems: items.concat(topHeaderCenterItems),
            topHeaderCenterItems,
            topHeaderLeftItem: topHeaderItems.find(item => item.title === 'left')?.children?.[0] || null, 
            topHeaderRightItem: topHeaderItems.find(item => item.title === 'Right')?.children?.[0] || null
        };
    }
}