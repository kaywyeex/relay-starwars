import request from "superagent";
import { logger } from "../server";
const base_url = "http://localhost:5000";

export async function createShip(shipName, factionId) {
    try {
        // create new ship
        const shipData = await request.post(`${base_url}/ships`).send({
            name: shipName
        });
        const ship = shipData.body;

        // get faction ships
        const factionData = await request(`${base_url}/factions/${factionId}`);
        const ships = factionData.body.ships;
        ships.push(ship.id);

        // push new ship to faction ships array and patch ships array in db
        const patchFaction = await request(
            "PATCH",
            `${base_url}/factions/${factionId}`
        ).send({
            ships
        });

        // return ship from function
        return ship;
    } catch (err) {
        logger.error(err);
    }
}

// simple function that splices array by 1 at index of value
function removeArrayValue(array, value) {
    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

export async function deleteShip(factionId, shipId) {
    try {
        const deleteShip = await request.del(`${base_url}/ships/${shipId}`);

        const factionData = await request(`${base_url}/factions/${factionId}`);

        const newShips = removeArrayValue(
            factionData.body.ships,
            parseInt(shipId)
        );

        await request
            .patch(`${base_url}/factions/${factionId}`)
            .send({ ships: newShips });
    } catch (err) {
        logger.error(err);
    }
}

export async function getShip(id) {
    try {
        const data = await request(`${base_url}/ships/${id}`);
        return data.body;
    } catch (err) {
        logger.error(err);
    }
}

export async function getShips(id) {
    try {
        const factionsData = await request(`${base_url}/factions/${id}`);

        const shipsData = factionsData.body.ships.map(async ship => {
            await request(`${base_url}/ships/${ship}`);
        });

        return shipsData.body;
    } catch (err) {
        logger.error(err);
    }
}

export async function getFaction(id) {
    try {
        const factionData = await request(`${base_url}/factions/${id}`);
        return factionData.body;
    } catch (err) {
        logger.error(err);
    }
}

export async function getFactions(names) {
    try {
        let factions = [];
        const data = await request(`${base_url}/factions`);

        const manipulatedData = data.body.map(faction => {
            names.map(name => {
                if (name === faction.name) {
                    factions.push(faction);
                }
            });
        });

        return factions;
    } catch (err) {
        logger.error(err);
    }
}
