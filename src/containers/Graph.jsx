import Graph from "react-graph-vis";
// import Graph from "../../lib";

// import Graph from 'react-graph-vis'

import React from "react";

const draw = (props) =>
{
    let Qs = props.qs;
    
    const graph = {
        nodes: [], 
        edges: []
    };
    if(Qs)
    Qs.map((q,i) => {
        graph.nodes.push({ id: i, label:"q"+ i, color:q.isFinite?  "#e04141": "#fff"})
        q.q.map(node =>{
                graph.edges.push({from:i , to :node.value})
        })
    })
    
    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#000000"
        }
    };
    
    const events = {
        select: function (event) {
            var { nodes, edges } = event;
            console.log("Selected nodes:");
            console.log(nodes);
            console.log("Selected edges:");
            console.log(edges);
        }
    };
    
    return(
        <div> 
        <Graph graph={graph} options={options} events={events} style={{ height: "800px" ,width:"auto"}} />
    </div>
    
    );
}
export default draw