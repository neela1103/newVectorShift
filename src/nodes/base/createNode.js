import BaseNode from "./BaseNode";

// Create a React component for a given config by injecting it via data.config
export const createNodeComponent = (config) => {
  const Node = (props) => {
    const data = props.data || {};
    return <BaseNode {...props} data={{ ...data, config }} />;
  };
  Node.displayName = `Node(${config.type})`;
  return Node;
};
