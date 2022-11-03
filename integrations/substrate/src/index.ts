import { Node } from '@kyve/core-beta';
import Substrate from './runtime';

const runtime = new Substrate();

new Node(runtime).bootstrap();
