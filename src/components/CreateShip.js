import React, { Component } from "react";
import CreateShipMutation from "../mutations/CreateShipMutation";

class CreateShip extends Component {
    state = {
        shipName: "",
        factionId: "1"
    };

    render() {
        return (
            <div>
                <form className="css-form">
                    <input
                        className="css-input"
                        value={this.shipName}
                        type="text"
                        onChange={e =>
                            this.setState({ shipName: e.target.value })}
                        placeholder="Enter a name for the ship."
                    />
                    <input
                        className="css-input"
                        value={this.factionId}
                        onChange={e =>
                            this.setState({ factionId: e.target.value })}
                        placeholder="Enter the id of the faction it belongs to."
                    />
                    <button
                        className="submit-button"
                        onClick={e => this._createShip(e)}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }

    _createShip = e => {
        e.preventDefault();
        const { shipName, factionId } = this.state;
        CreateShipMutation(shipName, factionId, () =>
            console.log("Create Ship Callback")
        );
    };
}

export default CreateShip;
