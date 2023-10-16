export interface ICarService {
    title: string;
    description: string;
    imagePath: string;
    link: { text: string; url: string };
};

export interface ITransportServicesData {
    title: string;
    carServices: Array<ICarService>
};

export class TransportServicesAdapter {
    constructor() {};
  
    static transportServicesData(data: any): ITransportServicesData {
        return {
            title: data?.['transport-services.transport_services_title']?.value || '',
            carServices: data?.['transport-services.transport_services_card']?.map(card => ({
                title: card?.title?.value || "",
                description: card?.text?.value || "",
                imagePath: card?.image?.page_image[0].image || "",
                link: {
                    text: card?.btn_text?.value || "",
                    url: card?.link?.value || ""
                }
            }))
        };
    }
}