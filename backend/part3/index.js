require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

const Person = require("./models/person");

app.use(express.static("dist"));

morgan.token("body", (request) => JSON.stringify(request.body));

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/info", (request, response) => {
  const currentDate = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
<p>${currentDate}</p>`,
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "missing information",
    });
  }

  // if (persons.some((person) => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
