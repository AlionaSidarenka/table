import gql from "graphql-tag";

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
              languages(first: 100) {
                edges {
                  node {
                    id
                    color
                    name
                  }
                  size
                }
              }
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