import { commitMutation, graphql } from "react-relay";
// import { ConnectionHandler } from "relay-runtime";
import environment from "../Environment";

const mutation = graphql`
    mutation CreateShipMutation($input: CreateShipMutationInput!) {
        createShipMutation(input: $input) {
            faction {
                ships {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
            newShipEdge {
                node {
                    id
                    name
                }
            }
        }
    }
`;

const configs = [
    {
        type: "RANGE_ADD",
        parentID: "shipId",
        connectionInfo: [
            {
                key: "createShipMutation_ships",
                rangeBehavior: "append"
            }
        ],
        edgeName: "newShipEdge"
    }
];

export default (shipName, factionId, callback) => {
    const variables = {
        input: {
            shipName,
            factionId
        }
    };
    commitMutation(
        environment, // first arguement is environment
        {
            // the second is an object which contains the graphql mutation and it's variables
            // along with other config options
            mutation,
            variables,
            configs: configs,
            // getOptimisticResponse: () =>
            //     getOptimisticResponse(shipName, factionId),
            onCompleted: () => {
                callback();
            },
            onError: err => console.erorr(err)
        }
    );
};
