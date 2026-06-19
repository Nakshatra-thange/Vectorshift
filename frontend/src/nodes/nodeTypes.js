
// Central registry mapping node "type" strings to components, used by
// ui.js's nodeTypes prop. The 5 demo nodes from Part 1 (math, filter,
// delay, apiRequest, conditional) are registered straight from their
// configs - no dedicated component file needed for them.

import { createNode } from './nodeFactory';

import { InputNode } from './InputNode';
import { OutputNode } from './OutputNode';
import { LLMNode } from './LLMNode';
import { TextNode } from './TextNode';

import { mathConfig } from './configs/math';
import { filterConfig } from './configs/filter';
import { delayConfig } from './configs/delay';
import { apiConfig } from './configs/api';
import { conditionalConfig } from './configs/conditional';

export const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  math: createNode(mathConfig),
  filter: createNode(filterConfig),
  delay: createNode(delayConfig),
  apiRequest: createNode(apiConfig),
  conditional: createNode(conditionalConfig),
};
