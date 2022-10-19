import { Node } from "@kyve/core";
import Bitcoin from "./runtime";

const runtime = new Bitcoin();

new Node(runtime).bootstrap();
