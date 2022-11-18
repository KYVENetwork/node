import { Node } from "@kyve/core-beta";
import Zilliqa from "./runtime";

const runtime = new Zilliqa();

new Node(runtime).bootstrap();
