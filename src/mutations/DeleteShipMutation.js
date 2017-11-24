import { commitMutation, graphql } from "react-relay";

// import { ConnectionHandler } from "relay-runtime";
import environment from "../Environment";

const mutation = graphql`
    mutation DeleteShipMutation($input: DeleteShipMutationInput!) {
        deleteShipMutation(input: $input) {
            faction {
                ships {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
            deletedShipId
        }
    }
`;

const configs = [
    {
        type: "RANGE_DELETE",
        parentID: "shipId",
        connectionKeys: [
            { key: "deleteShipMutation_ships", rangeBehavior: "append" }
        ],
        pathToConnection: ["faction", "ships"],
        deletedIDFieldName: "deletedShipId"
    }
];

export default (shipId, factionId, callback) => {
    const variables = {
        input: {
            id: shipId,
            factionId: factionId
        }
    };
    commitMutation(environment, {
        mutation,
        variables,
        configs,
        onCompleted: () => {
            callback();
        },
        onError: err => console.erorr(err)
    });
};
