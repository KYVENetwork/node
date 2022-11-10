import { Node } from '@kyve/core-beta';
import EvmContractEvents from './runtime';

const runtime = new EvmContractEvents();

new Node(runtime).bootstrap();
