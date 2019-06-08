import React, { Component } from "react";
import fetch from "node-fetch";

const JYLLAND = `
{  
    "type":"Polygon",
    "coordinates":[  
       [  
          [  
             10.1953125,
             54.838663612975104
          ],
          [  
             9.755859375,
             55.47885346331034
          ],
          [  
             10.458984375,
             55.99838095535963
          ],
          [  
             11.42578125,
             56.29215668507645
          ],
          [  
             10.7666015625,
             57.016814017391106
          ],
          [  
             10.70068359375,
             58.15911242952296
          ],
          [  
             6.9873046875,
             56.93298739609704
          ],
          [  
             7.822265625000001,
             54.87660665410869
          ],
          [  
             10.1953125,
             54.838663612975104
          ]
       ]
    ]
 }
`

const FYN = `
{  
    "type":"Polygon",
    "coordinates":[  
       [  
          [  
             9.9481201171875,
             55.640398956687356
          ],
          [  
             9.656982421875,
             55.500638670267456
          ],
          [  
             9.84375,
             55.13178958302214
          ],
          [  
             10.458984375,
             54.917671343429596
          ],
          [  
             10.65673828125,
             54.91451400766527
          ],
          [  
             10.8984375,
             55.21022218832888
          ],
          [  
             10.832519531249998,
             55.53484823078213
          ],
          [  
             10.4864501953125,
             55.68377855290114
          ],
          [  
             9.9481201171875,
             55.640398956687356
          ]
       ]
    ]
 }
`

const SJÆLLAND = `
{  
   "type":"Polygon",
   "coordinates":[  
      [  
         [  
            12.2332763671875,
            56.15166933290848
         ],
         [  
            11.1566162109375,
            56.029087419764366
         ],
         [  
            10.8050537109375,
            55.801280971180454
         ],
         [  
            10.96435546875,
            55.407188641599014
         ],
         [  
            11.1181640625,
            55.090943622278544
         ],
         [  
            11.700439453125,
            54.996524259832526
         ],
         [  
            12.1124267578125,
            54.95869417101661
         ],
         [  
            12.2113037109375,
            55.01227627898974
         ],
         [  
            12.161865234375,
            55.06264118216743
         ],
         [  
            12.81005859375,
            55.531739499542304
         ],
         [  
            12.8155517578125,
            55.7765730186677
         ],
         [  
            12.6068115234375,
            55.933817894564726
         ],
         [  
            12.645263671875,
            56.07203547180089
         ],
         [  
            12.2332763671875,
            56.15166933290848
         ]
      ]
   ]
}
`

const BORNHOLM = `
{
    "type":"Polygon",
    "coordinates":[
       [
          [
             14.556884765625002,
             55.015425940562984
          ],
          [
             15.194091796874998,
             54.9081985929894
          ],
          [
             15.3094482421875,
             55.14434917097695
          ],
          [
             14.61181640625,
             55.37286814115173
          ],
          [
             14.556884765625002,
             55.015425940562984
          ]
       ]
    ]
}
`

const queries = {
    SJÆLLAND,
    FYN,
    JYLLAND,
    BORNHOLM
}

export default class CityWithinPolygon extends Component {

    state = {
        query: SJÆLLAND,
        results: []
    }

    async componentDidMount() {
        this.updateTable()
    }

    updateTable = async () => {
        const response = await fetch("http://localhost:3010/api/cities/within", {
            method: 'POST',
            body: this.state.query,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        this.setState({ results: await response.json() })
    }

    onSelectQueryChange = e => {
        const name = e.target.value
        console.log(name)
        const query = queries[name]
        this.setState({query}, () => {
            this.updateTable()
        })
    }

    render() {

        return (
            <>
                <h2>Find cities within polygon</h2>
                <form>
                    <select onChange={this.onSelectQueryChange}>
                        {Object.entries(queries).map(([name, query]) =>
                            <option key={name} value={name}>{name}</option>
                        )}
                    </select>
                </form>
                <pre>{this.state.query}</pre>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results.map(c =>
                            <tr key={c._id}>
                                <td>{c.name}</td>
                                <td>{c.country}</td>
                                <td>{c.position.coordinates[1]}</td>
                                <td>{c.position.coordinates[0]}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        )
    }
}