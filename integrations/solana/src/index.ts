import { Node } from '@kyve/core-beta';

import Solana from './runtime';

const runtime = new Solana();

new Node(runtime).bootstrap();
