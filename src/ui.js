import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { Icon } from '@iconify/react';

import 'reactflow/dist/style.css';
import { demoNodeConfigs, nodeTypes } from './nodes';
import { SubmitButton } from './submit';
import { Box, Button, Typography } from '@mui/material';

const gridSize = 20;
const proOptions = { hideAttribution: true };


const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  removeNode: state.removeNode
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    removeNode
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = {
      id: nodeID, nodeType: `${type}`, onDelete: () => removeNode(nodeID)
    };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleClick = (type) => {
    const nodeID = getNodeID(type);
    const newNode = {
      id: nodeID,
      type: type, // must match nodeTypes
      position: { x: 250, y: 100 + nodes.length * 80 },
      data: getInitNodeData(nodeID, type),
    };

    addNode(newNode);
  }

  return (
    <div ref={reactFlowWrapper} style={{ width: '100wv', height: '80vh' }}>
      <Box sx={{ height: "10vh", display: 'flex', justifyContent: "center", alignItems: 'center', gap: 2 }}>
        {
          Object.keys(demoNodeConfigs).map((item, index) => {
            const ourNode = demoNodeConfigs[item]
            return (
              <Button key={`${item.id}${index}`}
                sx={{
                  display: "flex",
                  gap: 1,
                  width: "120px",
                  height: "40px",
                  background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #5a0fbf 0%, #1e63e9 100%)", // slightly darker on hover
                  },
                }}
                onClick={() => handleClick(ourNode?.type)}
              >
                <Icon icon={ourNode.icon} style={{ fontSize: "20px" }} />
                <Typography variant='caption' sx={{ textTransform: "capitalize", lineHeight: 1.1 }}>{ourNode.title.toLowerCase()}</Typography>
              </Button>
            )
          })
        }
      </Box>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
        deleteKeyCode={8}
      >

        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />

      </ReactFlow>
      <Box sx={{ height: "10vh", display: "flex", justifyContent: "center", alignitem: "center" }}>
        <SubmitButton nodes={nodes} edges={edges} />
      </Box>
    </div>

  )
}
