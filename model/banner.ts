import { ConfirmationStepIcon } from "@/public/assets/svgs/ConfirmationStepIcon";
import { QuoteStepIcon } from "@/public/assets/svgs/QuoteStepIcon";
import { LocationIcon } from "@/public/assets/svgs/locationIcon";
import { OptionsIcon } from "@/public/assets/svgs/OptionsIcon";

type ActiveStep = 1 | 2 | 3 | 4;

interface IContentsStepsBar {
    id: ActiveStep;
    text: string;
    IconComponent: React.FC<{ color?: string }>;
};

export interface IBannerImages {
    id: number;
    path: string;
};

export interface IBannerData {
    title: string;
    subTitle: string;
    stepsBar: Array<IContentsStepsBar>;
    links: Array<{ text: string; url: string; id: number }>;
    bannerImages: Array<IBannerImages>;
};

export class BannerAdapter {
    constructor() {};
  
    static createBannerData(data: any): IBannerData {

        const Icons = [
            LocationIcon,
            OptionsIcon,
            ConfirmationStepIcon,
            QuoteStepIcon,
        ];

        return {
            title: data?.['banner.title']?.value || '',
            subTitle: data?.['banner.sub-title']?.value || '',
            stepsBar: data?.['banner.form_steps']?.map((step, index) => ({
                id: index + 1,
                text: step?.text?.value || '',
                IconComponent: Icons[index]
            })),
            links: data?.['banner.link']?.map((link, index) => ({
                text: link?.text?.value  || "",
                url: link?.url?.value || '',
                id: index
            })),
            bannerImages: data?.['banner.banner_image']?.map((bannerImage, index) => ({
                id: bannerImage?.['']?.id || index,
                path: bannerImage?.['']?.page_image?.[0]?.image || ''
            }))
        };
    };
};