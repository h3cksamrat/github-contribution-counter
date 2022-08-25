# Github Contribution Counter

This package gives you power of getting your contributions and also the green boxes you've filled in year.

## To install

```js
npm install github-contribution-counter
```

### Requirements:

[Github Personal Token](https://github.com/settings/tokens) with permission `read:usr`

> Keep it safe, don't share it with anyone

### Usage:

**github-contribution-counter** is a promise based contribution counter with support of typescript, esm and commonjs.

```js
import { getGithubContributionsForYear } from "github-contribution-counter";

const username = "githubUsername";
const token = "gh_token";
const year = 2022;

// Get Contributions for year with contribution count
getGithubContributionsForYear(username, token, year);

// Get Overall Contribution
getGithubContributions({
  username,
  token,
});
```
