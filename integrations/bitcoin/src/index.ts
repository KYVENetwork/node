import { Node } from "@kyve/core-beta";

import Bitcoin from "./runtime";

const runtime = new Bitcoin();

new Node(runtime).bootstrap();
