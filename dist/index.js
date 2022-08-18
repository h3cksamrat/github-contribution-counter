'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

const getGithubContributions = async ({ username, token, }) => {
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
    const response = await axios__default["default"].post("https://api.github.com/graphql", body, {
        headers,
    });
    return response;
};
const getGithubContributionsForYear = async (username, token, year) => {
    const contributions = await getGithubContributions({
        username,
        token,
    });
    let yearContribution = [];
    const { data: { user: { contributionsCollection: { contributionCalendar: { weeks }, }, }, }, } = contributions.data;
    const contributionWeeks = weeks.filter((week) => {
        const { firstDay } = week;
        if (firstDay.includes(year.toString()) ||
            week.contributionDays[6].date.includes(year.toString())) {
            return true;
        }
    });
    const totalYearContributionCount = contributionWeeks.reduce((acc, week) => {
        const { contributionDays } = week;
        const contributedDays = [];
        const contributedCount = acc +
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

exports.getGithubContributions = getGithubContributions;
exports.getGithubContributionsForYear = getGithubContributionsForYear;
//# sourceMappingURL=index.js.map
