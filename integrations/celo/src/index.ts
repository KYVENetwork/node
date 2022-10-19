import { Node } from '@kyve/core';
import Celo from './runtime';

const runtime = new Celo();

new Node(runtime).bootstrap();
