import { Node } from '@kyve/core-beta';
import Near from './runtime';

const runtime = new Near();

new Node(runtime).bootstrap();
