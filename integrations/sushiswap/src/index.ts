import { Node } from '@kyve/core-beta';
import SushiswapEvents from "./runtime";

const runtime = new SushiswapEvents();

new Node(runtime).bootstrap();
