import {useQuery} from "@apollo/client";
import {REPOS} from "../queries";
import {useCallback, useMemo} from "react";

export function useGithub() {
    const {loading, error, data: { search } = { search: { edges: [], repositoryCount: 0 } }, fetchMore} = useQuery(REPOS);
    const fetchMoreData = useCallback(() => {
        fetchMore({
            variables: {
                after: search.pageInfo.endCursor
            }
        });
    }, [fetchMore, search]);

    const rows = useMemo(() => search.edges.map(edge => ({...edge.node, owner: edge.node.owner.login})), [search]);

    return { rows, count: search.repositoryCount, fetchMoreData, loading, error };
}