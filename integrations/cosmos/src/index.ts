import { Node } from '@kyve/core-beta';
import Cosmos from './runtime';

const runtime = new Cosmos();

new Node(runtime).bootstrap();
