import {useQuery} from "@apollo/client";
import {REPOS} from "../queries";
import {useCallback, useMemo} from "react";

export function useGithub() {
    const {loading, error, data: { search } = { search: { edges: [], repositoryCount: 0 } }, fetchMore} = useQuery(REPOS, {
        variables: {
            query: 'is:public'
        }
    });
    const fetchMoreData = useCallback(() => {
        fetchMore({
            variables: {
                after: search.pageInfo.endCursor,
                query: 'is:public jquery in:name' // @TO_DO set real query value https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-for-repositories
            }
        });
    }, [fetchMore, search]);

    const rows = useMemo(() => search.edges.map(edge => ({...edge.node, owner: edge.node.owner.login})), [search]);

    return { rows, count: search.repositoryCount, fetchMoreData, loading, error };
}