// Describes one node type in a declarative way
export const POS = { left: 'Left', right: 'Right', top: 'Top', bottom: 'Bottom' };

export const makeNodeConfig = ({
    type,                // unique key used in React Flow's nodeTypes
    title,
    icon,                // optional React element
    description,         // optional string
    theme = {},          // { accent, bg, text } optional style tokens
    inputs = [],         // [{ id, side: 'left'|'right'|'top'|'bottom', label? }]
    outputs = [],        // same shape
    fields = [],         // [{ key, label, input: 'text'|'number'|'textarea'|'select', options? }]
    defaults = {},       // initial values for fields
}) => ({
    type, title, icon, description, theme, inputs, outputs, fields, defaults,
});
