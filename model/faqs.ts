export interface IQuestions {
    question: string;
    answer: string;
    id: number;
};

export interface IFaqData {
    title: string;
    subTitle: string;
    questions: Array<IQuestions>;
};

export class FaqAdapter {
    constructor() {};
  
    static createFaqData(data: any): IFaqData {
        return {
            title: data?.['faq.title']?.value || '',
            subTitle: data?.['faq.sub_title']?.value || '',
            questions: Array.isArray(data['faq.questions']) ? data['faq.questions'].map((question, index) => ({
                answer: question?.answer?.value || '',
                question: question?.question?.value || '',
                id: index
            })) : []
        };
    }
}