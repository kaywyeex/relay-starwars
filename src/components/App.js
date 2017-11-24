import React, { Component } from "react";
import ShipListPage from "./ShipListPage";
import CreateShip from "./CreateShip";

class App extends Component {
    render() {
        return (
            <div className="css-root">
                <CreateShip />
                <ShipListPage />
            </div>
        );
    }
}

export default App;
