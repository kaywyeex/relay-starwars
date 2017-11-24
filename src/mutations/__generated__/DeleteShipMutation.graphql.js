/**
 * @flow
 * @relayHash 418c254e8b265043f2788d6587bace06
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DeleteShipMutationVariables = {|
  input: {
    factionId: string;
    id: string;
    clientMutationId?: ?string;
  };
|};
export type DeleteShipMutationResponse = {|
  +deleteShipMutation: ?{|
    +faction: ?{|
      +ships: ?{|
        +edges: ?$ReadOnlyArray<?{|
          +node: ?{|
            +id: string;
          |};
        |}>;
      |};
    |};
    +deletedShipId: ?string;
  |};
|};
*/


/*
mutation DeleteShipMutation(
  $input: DeleteShipMutationInput!
) {
  deleteShipMutation(input: $input) {
    faction {
      ships {
        edges {
          node {
            id
          }
        }
      }
      id
    }
    deletedShipId
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteShipMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteShipMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteShipMutationInput!"
          }
        ],
        "concreteType": "DeleteShipMutationPayload",
        "name": "deleteShipMutation",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Faction",
            "name": "faction",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ShipConnection",
                "name": "ships",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "ShipEdge",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Ship",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "id",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedShipId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "DeleteShipMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteShipMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DeleteShipMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteShipMutationInput!"
          }
        ],
        "concreteType": "DeleteShipMutationPayload",
        "name": "deleteShipMutation",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Faction",
            "name": "faction",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ShipConnection",
                "name": "ships",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "ShipEdge",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Ship",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "id",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedShipId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation DeleteShipMutation(\n  $input: DeleteShipMutationInput!\n) {\n  deleteShipMutation(input: $input) {\n    faction {\n      ships {\n        edges {\n          node {\n            id\n          }\n        }\n      }\n      id\n    }\n    deletedShipId\n  }\n}\n"
};

module.exports = batch;
