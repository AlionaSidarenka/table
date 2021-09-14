import gql from "graphql-tag";

export const githibData = {
    token: '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',
    name: 'AlionaSidarenka'
};

export const baseUrl = 'https://api.github.com/graphql';

export const REPOS = gql`
    query listRepos($after: String) {
      rateLimit {
        cost
        remaining
        resetAt
      }
      search(query: "is:public", type: REPOSITORY, first: 100, after: $after) {
        repositoryCount
        pageInfo {
          endCursor
          startCursor
        }
        edges {
          node {
            ... on Repository {
              name
              url
              owner {
                login
              }
              stargazerCount
              description
            }
          }
        }
      }
    }`;

export const CLIENT_SIDE_REPOS = gql`
    query listRepos($after: String) {
      filteredRepos @client {
        repositoryCount
        pageInfo {
          endCursor
          startCursor
        }
        edges {
          node {
            ... on Repository {
              name
              url
              owner {
                login
              }
              stargazerCount
              description
            }
          }
        }
      }
      
      search(query: "is:public", type: REPOSITORY, first: 100, after: $after) {
        repositoryCount
        pageInfo {
          endCursor
          startCursor
        }
        edges {
          node {
            ... on Repository {
              name
              url
              owner {
                login
              }
              stargazerCount
              description
            }
          }
        }
      }
    }`;

export const headers = {
    Authorization: `bearer ${githibData.token}`
};