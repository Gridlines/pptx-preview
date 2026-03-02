export type PartEntry = {
    partName: string;
    contentType: string;
};
export declare function generateContentTypesXml(parts: PartEntry[]): string;
