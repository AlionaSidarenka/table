import './App.css';
import {CLIENT_SIDE_REPOS} from "./config";
import MTable from "./components/table/table";
import {useQuery} from "@apollo/client";
import {useCallback, useMemo} from "react";

function App() {
    const {loading, error, data, fetchMore} = useQuery(CLIENT_SIDE_REPOS);
    const fetchMoreData = useCallback(() => {
        fetchMore({
                variables: {
                    after: data.search.pageInfo.endCursor,
                    filter: 'a'
                }
        });
    }, [fetchMore, data]);

    const rows = data && data.filteredRepos ? data.filteredRepos.edges.map(edge => ({...edge.node, owner: edge.node.owner.login})) : [];

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error...</p>;
    }

    return (
        <MTable fetchMoreData={fetchMoreData}
                rows={rows}
                count={data.search.repositoryCount}
        />
    );
}

export default App;