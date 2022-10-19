import { Node } from '@kyve/core';
import Substrate from './runtime';

const runtime = new Substrate();

new Node(runtime).bootstrap();
