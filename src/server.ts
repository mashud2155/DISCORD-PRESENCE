import express from "express";
import { WebSocket } from "ws";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parents Discord IDs (Top row)
const PARENT1_DISCORD_ID = process.env.PARENT1_ID || "1246520897439924316"; // Replace with parent 1 ID
const PARENT2_DISCORD_ID = process.env.PARENT2_ID || "504309808984227842"; // Replace with parent 2 ID

// Children Discord IDs (Bottom row)
const CHILD1_DISCORD_ID = process.env.CHILD1_ID || "462342010330677258"; // Your current ID
const CHILD2_DISCORD_ID = process.env.CHILD2_ID || "1163361212453634058"; // Your friend's ID
const CHILD3_DISCORD_ID = process.env.CHILD3_ID || "462342010330677258"; // Third child ID

let parent1PresenceData: any = null;
let parent2PresenceData: any = null;
let child1PresenceData: any = null;
let child2PresenceData: any = null;
let child3PresenceData: any = null;

// Connect to Lanyard WebSocket API for Parent 1
function connectToParent1Lanyard() {
  const ws = new WebSocket("wss://api.lanyard.rest/socket");

  ws.on("open", () => {
    console.log("Connected to Lanyard API for Parent 1");
    ws.send(
      JSON.stringify({
        op: 2,
        d: {
          subscribe_to_id: PARENT1_DISCORD_ID,
        },
      })
    );
  });

  ws.on("message", (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      
      if (message.op === 1) {
        ws.send(JSON.stringify({ op: 3 }));
      } else if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
        if (message.d) {
          parent1PresenceData = message.d;
          console.log(`Parent 1 presence: ${message.d.discord_user?.username} - ${message.d.discord_status || "offline"}`);
        }
      }
    } catch (error) {
      console.error("Error parsing Parent 1 presence:", error);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error (Parent 1):", error);
  });

  ws.on("close", () => {
    console.log("Parent 1 WebSocket closed, reconnecting in 5 seconds...");
    setTimeout(connectToParent1Lanyard, 5000);
  });
}

// Connect to Lanyard WebSocket API for Parent 2
function connectToParent2Lanyard() {
  const ws = new WebSocket("wss://api.lanyard.rest/socket");

  ws.on("open", () => {
    console.log("Connected to Lanyard API for Parent 2");
    ws.send(
      JSON.stringify({
        op: 2,
        d: {
          subscribe_to_id: PARENT2_DISCORD_ID,
        },
      })
    );
  });

  ws.on("message", (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      
      if (message.op === 1) {
        ws.send(JSON.stringify({ op: 3 }));
      } else if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
        if (message.d) {
          parent2PresenceData = message.d;
          console.log(`Parent 2 presence: ${message.d.discord_user?.username} - ${message.d.discord_status || "offline"}`);
        }
      }
    } catch (error) {
      console.error("Error parsing Parent 2 presence:", error);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error (Parent 2):", error);
  });

  ws.on("close", () => {
    console.log("Parent 2 WebSocket closed, reconnecting in 5 seconds...");
    setTimeout(connectToParent2Lanyard, 5000);
  });
}

// Connect to Lanyard WebSocket API for Child 1 (Your account)
function connectToChild1Lanyard() {
  const ws = new WebSocket("wss://api.lanyard.rest/socket");

  ws.on("open", () => {
    console.log("Connected to Lanyard API for Child 1");
    ws.send(
      JSON.stringify({
        op: 2,
        d: {
          subscribe_to_id: CHILD1_DISCORD_ID,
        },
      })
    );
  });

  ws.on("message", (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      
      if (message.op === 1) {
        ws.send(JSON.stringify({ op: 3 }));
      } else if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
        if (message.d) {
          child1PresenceData = message.d;
          console.log(`Child 1 presence: ${message.d.discord_user?.username} - ${message.d.discord_status || "offline"}`);
        }
      }
    } catch (error) {
      console.error("Error parsing Child 1 presence:", error);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error (Child 1):", error);
  });

  ws.on("close", () => {
    console.log("Child 1 WebSocket closed, reconnecting in 5 seconds...");
    setTimeout(connectToChild1Lanyard, 5000);
  });
}

// Connect to Lanyard WebSocket API for Child 2 (Friend's account)
function connectToChild2Lanyard() {
  const ws = new WebSocket("wss://api.lanyard.rest/socket");

  ws.on("open", () => {
    console.log("Connected to Lanyard API for Child 2");
    ws.send(
      JSON.stringify({
        op: 2,
        d: {
          subscribe_to_id: CHILD2_DISCORD_ID,
        },
      })
    );
  });

  ws.on("message", (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      
      if (message.op === 1) {
        ws.send(JSON.stringify({ op: 3 }));
      } else if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
        if (message.d) {
          child2PresenceData = message.d;
          console.log(`Child 2 presence: ${message.d.discord_user?.username} - ${message.d.discord_status || "offline"}`);
        }
      }
    } catch (error) {
      console.error("Error parsing Child 2 presence:", error);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error (Child 2):", error);
  });

  ws.on("close", () => {
    console.log("Child 2 WebSocket closed, reconnecting in 5 seconds...");
    setTimeout(connectToChild2Lanyard, 5000);
  });
}

// Connect to Lanyard WebSocket API for Child 3 (Third child)
function connectToChild3Lanyard() {
  const ws = new WebSocket("wss://api.lanyard.rest/socket");

  ws.on("open", () => {
    console.log("Connected to Lanyard API for Child 3");
    ws.send(
      JSON.stringify({
        op: 2,
        d: {
          subscribe_to_id: CHILD3_DISCORD_ID,
        },
      })
    );
  });

  ws.on("message", (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      
      if (message.op === 1) {
        ws.send(JSON.stringify({ op: 3 }));
      } else if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
        if (message.d) {
          child3PresenceData = message.d;
          console.log(`Child 3 presence: ${message.d.discord_user?.username} - ${message.d.discord_status || "offline"}`);
        }
      }
    } catch (error) {
      console.error("Error parsing Child 3 presence:", error);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error (Child 3):", error);
  });

  ws.on("close", () => {
    console.log("Child 3 WebSocket closed, reconnecting in 5 seconds...");
    setTimeout(connectToChild3Lanyard, 5000);
  });
}

// Start all WebSocket connections
connectToParent1Lanyard();
connectToParent2Lanyard();
connectToChild1Lanyard();
connectToChild2Lanyard();
connectToChild3Lanyard();

app.use(express.static(join(__dirname, "public")));

app.get("/api/presence", (req, res) => {
  const familyTree = {
    parents: [],
    children: []
  };
  
  // Add Parent 1 presence data
  if (parent1PresenceData) {
    familyTree.parents.push(parent1PresenceData);
  } else {
    familyTree.parents.push({
      discord_user: { id: PARENT1_DISCORD_ID, username: "Loading..." },
      discord_status: "offline"
    });
  }
  
  // Add Parent 2 presence data
  if (parent2PresenceData) {
    familyTree.parents.push(parent2PresenceData);
  } else {
    familyTree.parents.push({
      discord_user: { id: PARENT2_DISCORD_ID, username: "Loading..." },
      discord_status: "offline"
    });
  }
  
  // Add Child 1 presence data
  if (child1PresenceData) {
    familyTree.children.push(child1PresenceData);
  } else {
    familyTree.children.push({
      discord_user: { id: CHILD1_DISCORD_ID, username: "Loading..." },
      discord_status: "offline"
    });
  }
  
  // Add Child 2 presence data
  if (child2PresenceData) {
    familyTree.children.push(child2PresenceData);
  } else {
    familyTree.children.push({
      discord_user: { id: CHILD2_DISCORD_ID, username: "Loading..." },
      discord_status: "offline"
    });
  }
  
  // Add Child 3 presence data
  if (child3PresenceData) {
    familyTree.children.push(child3PresenceData);
  } else {
    familyTree.children.push({
      discord_user: { id: CHILD3_DISCORD_ID, username: "Loading..." },
      discord_status: "offline"
    });
  }
  
  res.json(familyTree);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`👨‍👩‍👧‍👦 Family Tree Discord Presence Viewer`);
  console.log(`👪 Parents:`);
  console.log(`   - Parent 1: ${PARENT1_DISCORD_ID}`);
  console.log(`   - Parent 2: ${PARENT2_DISCORD_ID}`);
  console.log(`👶 Children:`);
  console.log(`   - Child 1: ${CHILD1_DISCORD_ID}`);
  console.log(`   - Child 2: ${CHILD2_DISCORD_ID}`);
  console.log(`   - Child 3: ${CHILD3_DISCORD_ID}`);
});