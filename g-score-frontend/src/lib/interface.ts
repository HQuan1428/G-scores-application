
export interface ScoreData {
    toan: number;
    ngu_van: number;
    ngoai_ngu: number;
    vat_li: number;
    hoa_hoc: number;
    sinh_hoc: number;
    lich_su: number;
    dia_li: number;
    gdcd: number;
    ma_ngoai_ngu: string;
}


export interface StudentDataAGroup {
    "registration_number": string;
    "total_score": number;
    "toan": number;
    "vat_li": number;
    "hoa_hoc": number;
}

export interface StatisticsSubject {
    "subject": string;
    ">=8": number;
    "6-8": number;
    "4-6": number;
    "<4": number;
}