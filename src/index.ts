import axios, { AxiosResponse } from "axios";

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

export const getGithubContributions = async ({
  username,
  token,
}: GetGithubContributions): Promise<
  AxiosResponse<GetGithubContributionsResponse>
> => {
  if (!username || !token) {
    throw new Error("You must provide a github username and token");
  }

  const headers = {
    Authorization: `bearer ${token}`,
  };
  const body = {
    query: `query {
          user(login: "${username}") {
            name
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays{
                    contributionCount
                    date
                  }
                  firstDay
                }
              }
            }
          }
        }`,
  };

  const response = await axios.post("https://api.github.com/graphql", body, {
    headers,
  });
  return response;
};

export const getGithubContributionsForYear = async (
  username: string,
  token: string,
  year: number
): Promise<GetGithubContributionsForYearResponse> => {
  const contributions = await getGithubContributions({
    username,
    token,
  });

  let yearContribution: ContributionDay[] = [];

  const {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: { weeks },
        },
      },
    },
  } = contributions.data;

  const contributionWeeks = weeks.filter((week) => {
    const { firstDay } = week;
    if (
      firstDay.includes(year.toString()) ||
      week.contributionDays[6].date.includes(year.toString())
    ) {
      return true;
    }
  });

  const totalYearContributionCount = contributionWeeks.reduce((acc, week) => {
    const { contributionDays } = week;
    const contributedDays: ContributionDay[] = [];
    const contributedCount =
      acc +
      contributionDays.reduce((acc, day) => {
        if (day.contributionCount > 0 && day.date.includes(year.toString())) {
          contributedDays.push(day);
          acc++;
        }
        return acc;
      }, 0);
    yearContribution = [...yearContribution, ...contributedDays];
    return contributedCount;
  }, 0);

  return {
    totalYearContributionCount,
    yearContribution,
  };
};
