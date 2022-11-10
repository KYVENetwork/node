import { Node } from '@kyve/core-beta';
import UniswapEvents from "./runtime";

const runtime = new UniswapEvents();

new Node(runtime).bootstrap();
