import React, { Component } from "react";
import { createFragmentContainer, graphql } from "react-relay";
import Ship from "./Ship";
import DeleteShipMutation from "../mutations/DeleteShipMutation";

class ShipList extends Component {
    render() {
        const { query } = this.props;
        return (
            <div className="faction">
                <h5
                    className={
                        query.factionId === "1"
                            ? "rebels-header"
                            : "empire-header"
                    }
                >
                    {query.name}-
                    {query.factionId}
                </h5>
                <ul className="ships">
                    {query.ships.edges.map(({ node }) => {
                        return (
                            <Ship
                                key={node.__id}
                                faction={query}
                                ship={node}
                                _deleteShip={this._deleteShip}
                            />
                        );
                    })}
                </ul>
            </div>
        );
    }

    _deleteShip = (shipId, factionId) => {
        DeleteShipMutation(shipId, factionId, () =>
            console.log("Delete Ship Callback")
        );
    };
}

export default createFragmentContainer(
    ShipList,
    graphql`
        fragment ShipList_query on Faction {
            name
            factionId
            ships {
                edges {
                    node {
                        ...Ship_ship
                    }
                }
            }
        }
    `
);
