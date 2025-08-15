// toolbar.js

// import { DraggableNode } from './draggableNode';



export const PipelineToolbar = () => {

    const addNode = () => {
        setNodes((nds) => [
            ...nds,
            {
                id: node - ${ nds.length + 1 },
            type: "textNode", // must match nodeTypes
            position: { x: 250, y: 100 + nds.length * 80 },
            data: { label: Node ${ nds.length + 1 } },
},
    ]);
  };
return (
    <div style={{ padding: '10px' }}>
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {/* <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' /> */}
        </div>
    </div>
);
};
