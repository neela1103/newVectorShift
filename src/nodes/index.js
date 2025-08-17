// nodes/index.js
import { makeNodeConfig, POS } from '../utils/nodeConfig';
import { createNodeComponent } from './base/createNode';

const InputNodeConfig = makeNodeConfig({
  type: 'inputNode',
  title: 'Input',
  icon: "material-symbols:input-rounded",
  description: 'Pipeline input node',
  theme: { borderColor: '#3b82f6' },
  inputs: [],
  outputs: [{ id: 'out', side: POS.right }],
  fields: [
    { key: 'value', label: 'Value', input: 'text', placeholder: 'Enter input...' },
  ],
  defaults: { value: '' },
});

const OutputNodeConfig = makeNodeConfig({
  type: 'outputNode',
  title: 'Output',
  icon: "material-symbols:output-rounded",
  description: 'Pipeline output node',
  theme: { borderColor: '#f43f5e' },
  inputs: [{ id: 'in', side: POS.left }],
  outputs: [],
  fields: [],
  defaults: {},
});

const LLMNodeConfig = makeNodeConfig({
  type: 'llmNode',
  title: 'LLM',
  icon: "ph:open-ai-logo",
  description: 'Language model node',
  theme: { borderColor: '#22c55e' },
  inputs: [{ id: 'prompt', side: POS.left }],
  outputs: [{ id: 'response', side: POS.right }],
  fields: [
    {
      key: 'model', label: 'Model', input: 'select', options: [
        { value: 'gpt-3.5', label: 'GPT-3.5' },
        { value: 'gpt-4', label: 'GPT-4' }
      ]
    },
  ],
  defaults: {},
});

const TextNodeConfig = makeNodeConfig({
  type: 'textNode',
  title: 'Text',
  icon: 'icon-park-outline:text',
  description: 'Provide static text / Valid variable Name',
  theme: { borderColor: '#eab308' },
  inputs: [],
  outputs: [{ id: 'text', side: POS.right }],
  fields: [
    { key: 'text', label: 'Text', input: 'textarea', placeholder: 'Enter valid variables using {{}}' },
  ],
  defaults: { text: '' },
});


const CsvInputConfig = makeNodeConfig({
  type: 'csvInput',
  title: 'CSV Input',
  icon: "line-md:file",
  description: 'Provide CSV text or URL to feed data.',
  theme: { borderColor: '#0ea5e9' },
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
  icon: "icon-park-outline:page-template",
  description: 'Templatize prompts with {{variables}}.',
  theme: { borderColor: '#22c55e' },
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
  icon: "lucide:regex",
  description: 'Remove matches or extract groups with RegExp.',
  theme: { borderColor: '#f59e0b' },
  inputs: [{ id: 'text', side: POS.left }],
  outputs: [{ id: 'cleaned', side: POS.right }],
  fields: [
    { key: 'pattern', label: 'Pattern', input: 'text', placeholder: '\\d+' },
    { key: 'mode', label: 'Mode', input: 'select', options: ['Remove', 'Extract'] },
  ],
  defaults: { pattern: '', mode: 'Remove' },
});


const RandomNumberConfig = makeNodeConfig({
  type: 'randomNumber',
  title: 'Random Number',
  icon: "mingcute:random-line",
  description: 'Generates a random number between min and max.',
  theme: { borderColor: '#10b981' },
  inputs: [
    { id: 'min', side: POS.left },
    { id: 'max', side: POS.left },
  ],
  outputs: [{ id: 'value', side: POS.right }],
  fields: [
    { key: 'integer', label: 'Integer Only', input: 'checkbox', placeholder: '' },
  ],
  defaults: { integer: false },
});

const MathAggregateConfig = makeNodeConfig({
  type: 'mathAggregate',
  title: 'Math Aggregate',
  icon: "ph:math-operations-fill",
  description: 'Aggregate numbers (sum/avg/min/max).',
  theme: { borderColor: '#8b5cf6' },
  inputs: [{ id: 'numbers', side: POS.left }],
  outputs: [{ id: 'result', side: POS.right }],
  fields: [
    { key: 'op', label: 'Operation', input: 'select', options: ['sum', 'avg', 'min', 'max'] },
  ],
  defaults: { op: 'sum' },
});

export const nodeTypes = {
  inputNode: createNodeComponent(InputNodeConfig),
  outputNode: createNodeComponent(OutputNodeConfig),
  llmNode: createNodeComponent(LLMNodeConfig),
  textNode: createNodeComponent(TextNodeConfig),
  csvInput: createNodeComponent(CsvInputConfig),
  promptTemplate: createNodeComponent(PromptTemplateConfig),
  regexClean: createNodeComponent(RegexCleanConfig),
  randomNumber: createNodeComponent(RandomNumberConfig),
  mathAggregate: createNodeComponent(MathAggregateConfig),
};

export const demoNodeConfigs = {
  InputNodeConfig,
  OutputNodeConfig,
  LLMNodeConfig,
  TextNodeConfig,
  CsvInputConfig,
  PromptTemplateConfig,
  RegexCleanConfig,
  RandomNumberConfig,
  MathAggregateConfig,
};
