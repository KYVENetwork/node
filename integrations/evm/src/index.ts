import { Node } from '@kyve/core-beta';
import Evm from './runtime';

const runtime = new Evm();

new Node(runtime).bootstrap();
