import { AxiosResponse } from "axios";
export interface GetGithubContributions {
    username: string;
    token: string;
}
export interface ContributionDay {
    contributionCount: number;
    date: string;
}
export interface ContributionWeek {
    contributionDays: ContributionDay[];
    firstDay: string;
}
export interface GetGithubContributionsForYear {
    username: string;
    token: string;
    year: number;
}
export interface GetGithubContributionsForYearResponse {
    totalYearContributionCount: number;
    yearContribution: ContributionDay[];
}
export interface GetGithubContributionsResponse {
    data: {
        user: {
            name: string;
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: ContributionWeek[];
                };
            };
        };
    };
}
export declare const getGithubContributions: ({ username, token, }: GetGithubContributions) => Promise<AxiosResponse<GetGithubContributionsResponse>>;
export declare const getGithubContributionsForYear: (username: string, token: string, year: number) => Promise<GetGithubContributionsForYearResponse>;
