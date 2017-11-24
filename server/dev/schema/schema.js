import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    cursorForObjectInConnection,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
    toGlobalId
} from "graphql-relay";

import {
    createShip,
    deleteShip,
    getShip,
    getShips,
    getFaction,
    getFactions
} from "./database";

// get node interface and field from relay lib
// nodeDefinitions methods that map node ID back to the correct database object (So you can return it)
// nodeInterface defines the way you resolve an ID to it's matching object(search DB by ID)
// nodeField defines the way you resolve a node object to it's matching GraphQL type(match case)
const { nodeInterface, nodeField } = nodeDefinitions(
    globalId => {
        // resolve globalId to db match
        const { type, id } = fromGlobalId(globalId);
        console.log("ID: ", id);
        if (type === "Ship") {
            return getShip(id);
        } else if (type === "Faction") {
            console.log(type);
            return getFaction(id);
        }
    },
    obj => {
        // return matching object
        return obj.ships ? factionType : shipType;
    }
);

const shipType = new GraphQLObjectType({
    name: "Ship",
    description: "Starship in the star wars saga",
    fields: () => ({
        id: globalIdField("Ship"),
        name: {
            type: GraphQLString
        }
    }),
    interfaces: [nodeInterface]
});

// define a connection between an object and it's children (eg. a faction and it's ships)
// connectionType has an edges field which contains cursor and a ship node

const {
    connectionType: shipConnection, // Call the connection
    edgeType: ShipEdge // ConnectionType must have an Edge Type
} = connectionDefinitions({ name: "Ship", nodeType: shipType }); // Name connection and node + select node

// user type
const factionType = new GraphQLObjectType({
    name: "Faction",
    description: "Faction in the star wars saga",
    fields: () => ({
        id: globalIdField("Faction"),
        factionId: {
            type: GraphQLString,
            description: "id of faction in the db",
            resolve: faction => faction.id // comes from current obj resolved to factiontype
        },
        name: {
            type: GraphQLString,
            description: "Name of the faction"
        },
        ships: {
            type: shipConnection, // create relation  between faction and it's ships
            description: "Ships that belong to this faction",
            args: connectionArgs, // pagination args
            resolve: (
                faction, // faction is root
                args // connectionArgs are pagination Arguements (eg. first 2)
            ) => connectionFromArray(faction.ships.map(id => getShip(id)), args)
        }
    }),
    interfaces: [nodeInterface]
});

// root query type
// schema entry point
const Query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        node: nodeField,
        factions: {
            type: new GraphQLList(factionType),
            args: {
                names: {
                    type: new GraphQLList(GraphQLString)
                }
            },
            resolve: (root, { names }) => getFactions(names)
        },
        ships: {
            type: new GraphQLList(shipType),
            args: {
                factionId: { type: GraphQLString }
            },
            resolve: (root, { factionId }) => getShips(factionId) // factions are sorted under factionId
        }
    })
});

// create ship
const createShipMutation = mutationWithClientMutationId({
    name: "CreateShipMutation",
    inputFields: {
        // args
        shipName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        factionId: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    // after mutation (gives us shipId and factionId)
    outputFields: {
        // returned
        newShipEdge: {
            type: ShipEdge, // resolves to connectionType ShipEdge
            resolve: async function({ shipId, factionId }) {
                const ship = await getShip(shipId); // get returned id from payload func
                return {
                    cursor: cursorForObjectInConnection(
                        await getShips(factionId), // get all ships by factionId and return them
                        ship // new ship
                    ),
                    node: ship // node is the new ship
                };
            }
        },
        faction: {
            type: factionType,
            resolve: ({ factionId }) => getFaction(factionId) // get faction by id from db
        }
    },
    // runs mutation and returns ship- and factionId in payload, to outputField resolvers
    mutateAndGetPayload: async function({ shipName, factionId }) {
        const newShip = await createShip(shipName, factionId);
        return {
            shipId: newShip.id,
            factionId: factionId
        };
    }
});

const deleteShipMutation = mutationWithClientMutationId({
    name: "DeleteShipMutation",
    inputFields: {
        factionId: { type: new GraphQLNonNull(GraphQLID) },
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    outputFields: {
        deletedShipId: {
            type: GraphQLID,
            resolve: ({ deletedShipId }) => deletedShipId
        },
        faction: {
            type: factionType,
            resolve: ({ factionId }) => getFaction(factionId) // factionId from payload
        }
    },
    // runs mutation and returns deletedShip- and factionId in payload, to outputField resolvers
    mutateAndGetPayload: async function({ factionId, id }) {
        const localShipId = fromGlobalId(id).id;
        await deleteShip(factionId, localShipId);
        return {
            deletedShipId: localShipId,
            factionId: factionId
        };
    }
});

// root mutation type
// entry point for performing writes into schema
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "...", // optional
    fields: () => ({
        // pass all mutations here
        createShipMutation: createShipMutation,
        deleteShipMutation: deleteShipMutation
    })
});

export const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

// 1 TODO clean up database with async/await || DONE
// 2 TODO make optimistic updater (ship crew?) (votes)
