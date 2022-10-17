import { Node } from '@kyve/core';
import Solana from './runtime';

const runtime = new Solana();

new Node(runtime).bootstrap();
