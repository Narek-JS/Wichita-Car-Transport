interface IReview_home {
    title: string;
    description: string;
};

// About Us Data Model in home content
interface IServices_commercialServices_aboutUs_home {
    serviceTitle: string;
    serviceDescription: string;
    serviceIcon: string;
    serviceLinkText: string;
    serviceLink: string;
};

interface ICommercialServices_aboutUs_home {
    sectionName: string;
    title: string;
    services: Array<IServices_commercialServices_aboutUs_home>;
};

interface IAboutUs_home {
    sectionName: string;
    title: string;
    description: string;
    noteDescription: string;
    noteMessage: string;
    image: string;
    commercialServices: ICommercialServices_aboutUs_home
};

// Calculate Data Model in home content
interface INotes_home {
    answer: string;
    question: string;
};

interface ISteps_calculate_home {
    image: string;
    text: string;
};

interface ICalculate_home {
    title: string;
    titleImage: string;
    steps: Array<ISteps_calculate_home>;
    notes: Array<INotes_home>;
    stepImage: string;
};

export interface IHomeData {
    review: IReview_home;
    aboutUs: IAboutUs_home;
    calculate: ICalculate_home;
};

export class HomeAdapter {
    constructor() {};
  
    static getServices(data: Array<Record<string, Record<string, any>>>): Array<IServices_commercialServices_aboutUs_home> {
        return data.map(service => ({
            serviceTitle: service?.service_title?.value || '',
            serviceDescription: service?.service_description?.value || '',
            serviceIcon: service?.service_image?.page_image[0]?.image || '',
            serviceLinkText: service?.service_link_text?.value || '',
            serviceLink: service?.service_link?.value || ''
        }));
    };

    static getCalculateSteps(data: Array<Record<string, Record<string, any>>>): Array<ISteps_calculate_home> {
        return data.map(step => ({
            image: step?.image?.page_image[0]?.image || '',
            text: step?.text?.value || ''
        }));
    };

    static getCalculateNotes(data: Array<Record<string, Record<string, any>>>): Array<INotes_home> {
        return data.map(note => ({
            answer: note?.answer?.value || "",
            question: note?.question?.value || ""
        }));
    };

    static createHomeData(data: any): IHomeData {
        return {
            review: {
                title: data?.['home.review_title']?.value || '',
                description: data?.['home.review_description']?.value || ''
            },
            aboutUs: {
                sectionName: data?.['home.about_me_section_name']?.value || '',
                title: data?.['home.about_us_title']?.value || '',
                description: data?.['home.about_us_description']?.value || '',
                noteDescription: data?.['home.about_us_note_description']?.value || '',
                noteMessage: data?.['home.about_us_note_message']?.value || '',
                image: data?.['home.about_us_image']?.page_image[0]?.image || '/assets/images/aboutCompanyHome.png',
                commercialServices: {
                    sectionName: data?.['home.about_us_commercial_services_section_name']?.value || "",
                    title: data?.['home.about_us_commercial_services_title']?.value || "",
                    services: this.getServices(data?.['home.about_us_commercial_services'] || [])
                }
            },
            calculate: {
                title: data?.['home.calculate_title']?.value || '',
                titleImage: data?.['home.calculate_title_icon']?.page_image[0]?.image || '/assets/images/calculatedTitleIcon.png',
                steps: this.getCalculateSteps(data?.['home.calculate_step'] || []),
                notes: this.getCalculateNotes(data?.['home.calculate_note'] || []),
                stepImage: data?.['home.calculate_step_icon']?.page_image[0]?.image || '/assets/images/calculetedCenterICon.png'
            }
        };
    }
}