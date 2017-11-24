/**
 * @flow
 * @relayHash 5606edc037058d2d6c5f82b1df0329c2
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ShipListPageQueryResponse = {|
  +factions: ?$ReadOnlyArray<?{|
    +factionId: ?string;
  |}>;
|};
*/


/*
query ShipListPageQuery {
  factions(names: ["Rebels", "Empire"]) {
    factionId
    ...ShipList_query
    id
  }
}

fragment ShipList_query on Faction {
  name
  factionId
  ships {
    edges {
      node {
        ...Ship_ship
        id
      }
    }
  }
}

fragment Ship_ship on Ship {
  id
  name
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShipListPageQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "names",
            "value": [
              "Rebels",
              "Empire"
            ],
            "type": "[String]"
          }
        ],
        "concreteType": "Faction",
        "name": "factions",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "factionId",
            "storageKey": null
          },
          {
            "kind": "FragmentSpread",
            "name": "ShipList_query",
            "args": null
          }
        ],
        "storageKey": "factions{\"names\":[\"Rebels\",\"Empire\"]}"
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "ShipListPageQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "ShipListPageQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "names",
            "value": [
              "Rebels",
              "Empire"
            ],
            "type": "[String]"
          }
        ],
        "concreteType": "Faction",
        "name": "factions",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "factionId",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "type": "Faction",
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "name",
                "storageKey": null
              },
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
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "name",
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
            ]
          }
        ],
        "storageKey": "factions{\"names\":[\"Rebels\",\"Empire\"]}"
      }
    ]
  },
  "text": "query ShipListPageQuery {\n  factions(names: [\"Rebels\", \"Empire\"]) {\n    factionId\n    ...ShipList_query\n    id\n  }\n}\n\nfragment ShipList_query on Faction {\n  name\n  factionId\n  ships {\n    edges {\n      node {\n        ...Ship_ship\n        id\n      }\n    }\n  }\n}\n\nfragment Ship_ship on Ship {\n  id\n  name\n}\n"
};

module.exports = batch;
