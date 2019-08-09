const router = require("express").Router();

let chores = require("../chores/chores");
let people = require("../people/people");
//******** CHORES OPERATIONS BELOW! ***************

//Get all chores
//Use query params to filter completed todos
router.get("/", (req, res) => {
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

//Delete a specific chore using its ID
router.delete("/:id", (req, res) => {
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
router.post("/:id", (req, res) => {
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
router.put("/:id", (req, res) => {
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

module.exports = router;
