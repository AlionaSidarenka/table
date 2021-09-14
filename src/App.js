import './App.css';
import {REPOS} from "./config";
import MTable from "./components/table/table";
import {useQuery} from "@apollo/client";
import {useCallback, useMemo} from "react";

function App() {
    const {loading, error, data, fetchMore} = useQuery(REPOS);
    const fetchMoreData = useCallback(() => {
        fetchMore({
                variables: {
                    after: data.search.pageInfo.endCursor
                }
        });
    }, [fetchMore, data]);

    const rows = useMemo(() => data ? data.search.edges.map(edge => ({...edge.node, owner: edge.node.owner.login})) : [], [data]);

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