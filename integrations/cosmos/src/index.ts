import { Node } from '@kyve/core';
import Cosmos from './runtime';

const runtime = new Cosmos();

new Node(runtime).bootstrap();
