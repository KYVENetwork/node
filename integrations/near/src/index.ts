import { Node } from '@kyve/core';
import Near from './runtime';

const runtime = new Near();

new Node(runtime).bootstrap();
