---
slug: react-flow
title: React Flow for Elimination Brackets
authors: Johnathan
---

Using React Flow to create a somewhat dynamic elimination bracket for a tournament.

<!-- truncate -->

## Starting off with 3 nodes and 2 edges

Here I define a custom node type "match" that has a label and two handles, one on the left and one on the right.

```ts
import ReactFlow, { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

function MatchNode({ data }: { data: { label: string } }) {
  return (
    <>
      <Handle type="target" position={Position.Left} id="a" />
      <div className="rounded border p-5">{data.label}</div>
      <Handle type="source" position={Position.Right} id="b" />
    </>
  );
}

const nodeTypes = { match: MatchNode };

const initialNodes = [
  { id: "1", type: "match", position: { x: 100, y: 100 }, data: { label: "Match 1" } },
  { id: "2", type: "match", position: { x: 100, y: 300 }, data: { label: "Match 2" } },
  { id: "3", type: "match", position: { x: 300, y: 200 }, data: { label: "Match 3" } },
];
const initialEdges = [
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-3", source: "2", target: "3" },
];

export function FlowTest() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodeTypes={nodeTypes} nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}

```