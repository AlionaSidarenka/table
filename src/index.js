import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {baseUrl, headers} from "./config";
import { Provider} from "react-redux";
import store from "./store";

const client = new ApolloClient({
    uri: baseUrl,
    link: createHttpLink({
        uri: baseUrl,
        headers,
    }),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    filteredRepos: (existing, {args, storage, readField}) => {
                        const repos = readField('search');
                        let edges;
                        const filterValue = filter() || '';

                        if (repos) {
                            edges = readField('edges', repos);
                            return {
                                ...existing, ...{
                                    edges: edges.filter((edge) => {
                                        return edge.node.name.indexOf(filterValue) !== -1;
                                    })
                                }
                            };
                        }

                        return {...existing};
                    },
                    search: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: false,
                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing, incoming) {
                            debugger;
                            const edges = [
                                ...(existing ? existing.edges : []),
                                ...incoming.edges
                            ];
                            debugger;
                            return {...incoming, ...{edges}};
                        },
                    }
                },

            }
        },
    })
});

export const filter = client.cache.makeVar();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
