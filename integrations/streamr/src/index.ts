import { Node } from '@kyve/core-beta';

import Streamr from './runtime';

const runtime = new Streamr();

new Node(runtime).bootstrap();
