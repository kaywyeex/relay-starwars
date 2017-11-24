import React, { Component } from "react";
import { createFragmentContainer, graphql } from "react-relay";

class Ship extends Component {
    render() {
        const { ship } = this.props;
        const { faction } = this.props;
        return (
            <li className={faction.factionId === "1" ? "rebels" : "empire"}>
                <h5>{this.props.ship.name}</h5>

                <button
                    className="delete-button"
                    onClick={() =>
                        this.props._deleteShip(ship.id, faction.factionId)}
                >
                    Delete
                </button>
            </li>
        );
    }
}

export default createFragmentContainer(
    Ship,
    graphql`
        fragment Ship_ship on Ship {
            id
            name
        }
    `
);
