const express = require("express");

const server = express();

server.use(express.json());

let chores = [
  {
    id: 1,
    description: "Go and do this thing",
    notes: "Don't come home til you do",
    assignedTo: 6,
    completed: false
  },
  {
    id: 2,
    description: "Go and do this thing",
    notes: "Don't come home til you do",
    assignedTo: 5,
    completed: false
  },
  {
    id: 3,
    description: "Go and do this thing",
    notes: "Don't come home til you do",
    assignedTo: 4,
    completed: false
  },
  {
    id: 4,
    description: "Go and do this thing",
    notes: "Don't come home til you do",
    assignedTo: 3,
    completed: false
  },
  {
    id: 5,
    description: "Go and do this thing",
    notes: "Don't come home til you do",
    assignedTo: 2,
    completed: false
  },
  {
    id: 6,
    description: "Go and do this thing",
    notes: "Don't come home til you do",
    assignedTo: 1,
    completed: false
  },
  {
    id: 7,
    description: "Go and do this thing",
    notes: "Don't come home til you do",
    assignedTo: 3,
    completed: false
  },
  {
    id: 8,
    description: "Go and do this thing",
    notes: "Don't come home til you do",
    assignedTo: 7,
    completed: false
  },
  {
    id: 9,
    description: "Go and do this thing",
    notes: "Don't come home til you do",
    assignedTo: 2,
    completed: false
  }
];

const people = [
  {
    id: 1,
    name: "Mike VanSleen"
  },
  {
    id: 2,
    name: "Jose Montero"
  },
  {
    id: 3,
    name: "Wes Jonke"
  },
  {
    id: 4,
    name: "Laura Daugherty"
  },
  {
    id: 5,
    name: "Madison McKown"
  },
  {
    id: 6,
    name: "Robert Benavidez"
  },
  {
    id: 7,
    name: "Reed James"
  }
];

//Get all chores
server.get("/chores", (req, res) => {
  res.status(200).json(chores);
});

//Delete a psecific chore using its ID
server.delete("/chores/:id", (req, res) => {
  const choreId = Number(req.params.id);
  let deletedChore = chores.filter(chore => chore.id === choreId);
  chores = chores.filter(chore => {
    if (chore.id !== choreId) {
      return chore;
    }
  });
  res.status(200).json(deletedChore);
});

// Add a new chore, automatically increments ID based on array length
server.post("/chores/", (req, res) => {
  const newChore = req.body;
  newChore.id = chores.length + 1;
  chores.push(newChore);
  res.status(201).json(newChore);
});

//Update a chore using its ID
server.put("/chores/:id", (req, res) => {
  const choreId = Number(req.params.id);
  const updatedChore = req.body;
});

//Get all people
server.get("/people", (req, res) => {
  res.status(200).json(people);
});

module.exports = server;
