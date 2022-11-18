import { Node } from '@kyve/core-beta';
import Celo from './runtime';

const runtime = new Celo();

new Node(runtime).bootstrap();
