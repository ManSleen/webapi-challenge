const router = require("express").Router();

let people = require("../people/people");
let chores = require("../chores/chores");

//******** PEOPLE OPERATIONS BELOW! ***************

//Get all people
router.get("/", (req, res) => {
  res.status(200).json(people);
});

//Get a person's chores using person's ID
router.get("/:id/chores", (req, res) => {
  const personId = Number(req.params.id);
  if (people.filter(person => person.id === personId).length > 0) {
    let personsChores = chores.filter(chore => chore.assignedTo === personId);
    res.status(200).json(personsChores);
  } else {
    res.status(404).json({ message: "No person found with that ID!" });
  }
});

//Add a new person, automatically increment ID based on array length
router.post("/", (req, res) => {
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

module.exports = router;
