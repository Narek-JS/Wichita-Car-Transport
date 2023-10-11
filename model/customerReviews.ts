export interface IcustomerReviewsData {
    length: number;
    feedbacks: Array<any>;
};

export class CustomerReviewsDataAdapter {
    constructor() {};
  
    static createCustomerReviewsData(data: any): IcustomerReviewsData {
        return {
            length: data?.aaData?.length || 0,
            feedbacks: data?.aaData || [],
        };
    }
}