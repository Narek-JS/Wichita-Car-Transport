export interface IHelpData {
    title: string;
    texts: Array<string>;
};

export class HelpAdapter {
    constructor() {};
  
    static createHelpData(data: any): IHelpData {
        return {
            title: data?.['help.tilte']?.value || '',
            texts: data?.['help.text']?.map(({ line }) => line?.value || '') || []
        };
    }
}