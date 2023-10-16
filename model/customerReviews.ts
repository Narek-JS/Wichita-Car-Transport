export interface IFeedback {
    name: string;
    data: string;
    time: string;
    feedback: string;
    recommendation: boolean;
    stars: number;
};

export type TStarCountsId = 1 | 2 | 3 | 4 | 5;
export type TStarCountsIdKeys = '1' | '2' | '3' | '4' | '5';

export interface IStarCounts {
    id: TStarCountsId;
    percentCount: number;
    percent: number;
};

export interface IReviewsData {
    feedbacks: Array<IFeedback>;
    starCounts: Array<IStarCounts>;
    reviewPercent: number;
    feedbacksLenght: number;
};

export class ReviewsAdapter {
    constructor(
        public feedbacks: Array<IFeedback>,
        public starCounts: Array<IStarCounts>,
        public reviewPercent: number,
        public feedbacksLenght: number
    ) {};

    static getReviewPercent(starCounts: Array<IStarCounts>) {
        const allReviewPercentSum = starCounts.reduce((acc, {percentCount, id}) => acc + (percentCount * id), 0);
        const wholeNumber = allReviewPercentSum / starCounts.reduce((acc, {percentCount}) => acc + percentCount, 0);
        return String(wholeNumber).length > 2 ? Number(String(wholeNumber).slice(0, 2)) : wholeNumber;
    };

    static getStarCounts(starCounts, feedbacksLenght: number): Array<IStarCounts> {
        return starCounts ? Object.keys(starCounts).map((key) => ({
            id: Number(key) as TStarCountsId,
            percentCount: starCounts[key],
            percent: Math.round(starCounts[key] * 100 / feedbacksLenght)
        })) : []
    };

    static createReviewsData({ data }: any): ReviewsAdapter {
        const starCounts = this.getStarCounts(data?.starCounts, data?.resultCount);
        return {
            feedbacks: (data?.result || []).map((feedback: any) => ({
                name: feedback?.name || '',
                data: `Transported: ${feedback?.year} ${feedback?.make} ${feedback?.model}, From: ${feedback?.pick_up}, To: ${feedback?.drop_off}`,
                time: feedback?.created_at || '',
                feedback: feedback?.tell_us || '',
                recommendation: Boolean(feedback?.like_dislike),
                stars: feedback?.star || 5
            })),
            starCounts,
            reviewPercent: this.getReviewPercent(starCounts),
            feedbacksLenght: data?.resultCount || 0
        };
    };
};