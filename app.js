const Joi = require("joi");
const express = require("express");
const app = express();

// Connection to the cars.js file
const CarsRoutes = require("./Files/cars");
app.use("/dealer", CarsRoutes);

app.use(express.json());


const courses = [
	{id: 1, name: "Fred Lenovo"},
	{id: 2, name: "Ron Walker"},
	{id: 3, name: "Damien Hawkins"}
];

// Error handling program code
function validationCourse(course) {
	const schema = {
		name: Joi.string().min(3).required()
	};

	return Joi.validate(course, schema);
}


// Get data from courses variable
app.get("/", (req,res) => {
	res.send("Welcome to place Sell or Buy Cars!");
});

app.get("/member-area", (req,res) => {
	res.send(courses);
});

// Get data from ID which is in courses variable
app.get("/member-area/:id", (req,res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) {
		res.status(400).send("The courses given ID not found");
		return;
	}

	res.send(course);
});

// Add data to the ID that is in the courses variable
app.post("/member-area", (req,res) => {
	const {error} = validationCourse(req.body);

	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
});


app.put("/member-area/:id", (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) {
		res.status(404).send("The courses given ID not found");
		return;
	}

	const {error} = validationCourse(req.body);

	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	course, name = req.body.name;
	res.send(course);
});

// Delete Data
app.delete("/member-area/:id", (req,res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if(!course) {
		res.status(400).send("The courses given ID not found");
		return;
	}

	const index = courses.indexOf(course);
	courses.splice(index, 1);
	res.send(course);
});

// Server running
const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Server at listen http://localhost:${port}`));

module.exports = app;