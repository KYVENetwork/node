import { Node } from '@kyve/core';
import Evm from './runtime';

const runtime = new Evm();

new Node(runtime).bootstrap();
