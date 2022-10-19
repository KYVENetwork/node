import { Node } from "@kyve/core";
import Zilliqa from "./runtime";

const runtime = new Zilliqa();

new Node(runtime).bootstrap();
