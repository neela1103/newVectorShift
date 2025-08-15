import { makeNodeConfig, POS } from '../utils/nodeConfig';
import { createNodeComponent } from './base/createNode';


// Existing nodes (optional: convert them later using the same pattern)

// Five NEW demo nodes (declarative!)
const CsvInputConfig = makeNodeConfig({
  type: 'csvInput',
  title: 'CSV Input',
  description: 'Provide CSV text or URL to feed data.',
  theme: { accent: '#0ea5e9' },
  inputs: [],
  outputs: [{ id: 'data', side: POS.right }],
  fields: [
    { key: 'mode', label: 'Mode', input: 'select', options: ['Paste', 'URL'] },
    { key: 'payload', label: 'CSV / URL', input: 'textarea', placeholder: 'Paste CSV or enter https://...' },
  ],
  defaults: { mode: 'Paste', payload: '' },
});

const PromptTemplateConfig = makeNodeConfig({
  type: 'promptTemplate',
  title: 'Prompt Template',
  description: 'Templatize prompts with {{variables}}.',
  theme: { accent: '#22c55e' },
  inputs: [{ id: 'vars', side: POS.left }],
  outputs: [{ id: 'prompt', side: POS.right }],
  fields: [
    { key: 'template', label: 'Template', input: 'textarea', placeholder: 'e.g. Summarize: {{text}}' },
  ],
  defaults: { template: '' },
});

const RegexCleanConfig = makeNodeConfig({
  type: 'regexClean',
  title: 'Regex Clean',
  description: 'Remove matches or extract groups with RegExp.',
  theme: { accent: '#f59e0b' },
  inputs: [{ id: 'text', side: POS.left }],
  outputs: [{ id: 'cleaned', side: POS.right }],
  fields: [
    { key: 'pattern', label: 'Pattern', input: 'text', placeholder: '\\d+' },
    { key: 'mode', label: 'Mode', input: 'select', options: ['Remove', 'Extract'] },
  ],
  defaults: { pattern: '', mode: 'Remove' },
});

const SentimentConfig = makeNodeConfig({
  type: 'sentiment',
  title: 'Sentiment',
  description: 'Simple sentiment label (demo).',
  theme: { accent: '#ef4444' },
  inputs: [{ id: 'text', side: POS.left }],
  outputs: [{ id: 'label', side: POS.right }],
  fields: [
    { key: 'threshold', label: 'Pos Threshold', input: 'number', placeholder: '0.6' },
  ],
  defaults: { threshold: 0.6 },
});

const MathAggregateConfig = makeNodeConfig({
  type: 'mathAggregate',
  title: 'Math Aggregate',
  description: 'Aggregate numbers (sum/avg/min/max).',
  theme: { accent: '#8b5cf6' },
  inputs: [{ id: 'numbers', side: POS.left }],
  outputs: [{ id: 'result', side: POS.right }],
  fields: [
    { key: 'op', label: 'Operation', input: 'select', options: ['sum', 'avg', 'min', 'max'] },
  ],
  defaults: { op: 'sum' },
});

// Build components from configs
export const nodeTypes = {
  csvInput: createNodeComponent(CsvInputConfig),
  promptTemplate: createNodeComponent(PromptTemplateConfig),
  regexClean: createNodeComponent(RegexCleanConfig),
  sentiment: createNodeComponent(SentimentConfig),
  mathAggregate: createNodeComponent(MathAggregateConfig),
};

export const demoNodeConfigs = {
  CsvInputConfig,
  PromptTemplateConfig,
  RegexCleanConfig,
  SentimentConfig,
  MathAggregateConfig,
};
