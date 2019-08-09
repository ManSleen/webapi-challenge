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
    completed: true
  },
  {
    id: 5,
    description: "Go and do this thing",
    notes: "Don't come home til you do",
    assignedTo: 2,
    completed: true
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
    completed: true
  },
  {
    id: 9,
    description: "Go and do this thing",
    notes: "Don't come home til you do",
    assignedTo: 2,
    completed: false
  }
];

let people = [
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

//******** CHORES OPERATIONS BELOW! ***************

//Get all chores
//Use query params to filter completed todos
server.get("/chores", (req, res) => {
  if (req.query.completed === "true") {
    let completedChores = chores.filter(chore => chore.completed === true);
    res.status(200).json(completedChores);
  } else if (req.query.completed === "false") {
    let unCompletedChores = chores.filter(chore => chore.completed !== true);
    res.status(200).json(unCompletedChores);
  } else {
    res.status(200).json(chores);
  }
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
//Supply person's ID in URL params to add to that person's chores
server.post("/chores/:id", (req, res) => {
  const newChore = req.body;
  const personId = Number(req.params.id);
  newChore.id = chores.length + 1;
  newChore.assignedTo = personId;

  if (newChore.description) {
    if (!newChore.hasOwnProperty("completed")) {
      newChore.completed = false;
      chores.push(newChore);
      res.status(201).json(newChore);
    } else {
      chores.push(newChore);
      res.status(201).json(newChore);
    }
  } else {
    res
      .status(400)
      .json({ message: "You must supply a description to add a chore" });
  }
});

//Update a chore using its ID, using supplied body to make changes
server.put("/chores/:id", (req, res) => {
  const choreId = Number(req.params.id);
  const updatedChoreInfo = req.body;

  chores = chores.map(chore => {
    if (chore.id === choreId) {
      chore = updatedChoreInfo;
      chore.id = choreId;
      return chore;
    } else {
      return chore;
    }
  });

  let updatedChore = chores.filter(chore => chore.id === choreId);

  res.status(200).json(updatedChore);
});

//******** PEOPLE OPERATIONS BELOW! ***************

//Get all people
server.get("/people", (req, res) => {
  res.status(200).json(people);
});

//Get a person's chores using person's ID
server.get("/people/:id/chores", (req, res) => {
  const personId = Number(req.params.id);
  if (people.filter(person => person.id === personId).length > 0) {
    let personsChores = chores.filter(chore => chore.assignedTo === personId);
    res.status(200).json(personsChores);
  } else {
    res.status(404).json({ message: "No person found with that ID!" });
  }
});

//Add a new person, automatically increment ID based on array length
server.post("/people", (req, res) => {
  const newPersonId = people.length + 1;
  const newPersonInfo = req.body;
  newPersonInfo.id = newPersonId;
  if (newPersonInfo.name) {
    people.push(newPersonInfo);
    res.status(200).json(newPersonInfo);
  } else {
    res.status(400).json({ message: "You must supply a name for a user!" });
  }
});

module.exports = server;
