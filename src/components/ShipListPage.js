import React, { Component } from "react";
import { QueryRenderer, graphql } from "react-relay";
import environment from "../Environment";
import ShipList from "./ShipList";

const ShipListPageQuery = graphql`
    query ShipListPageQuery {
        factions(names: ["Rebels", "Empire"]) {
            factionId
            ...ShipList_query
        }
    }
`;

class ShipListPage extends Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={ShipListPageQuery}
                render={({ error, props }) => {
                    if (error) {
                        return <div>{error.message}</div>;
                    } else if (props) {
                        return (
                            <div className="factions">
                                {props.factions.map(obj => {
                                    return (
                                        <ShipList key={obj.__id} query={obj} />
                                    );
                                })}
                            </div>
                        );
                    }
                    return <div>Loading</div>;
                }}
            />
        );
    }
}

export default ShipListPage;
