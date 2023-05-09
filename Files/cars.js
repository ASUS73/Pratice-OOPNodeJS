const express = require("express");
const router = express.Router();

// Super-Class
class Speeds{
	constructor(power){
		this.power = power;
	}
	speed = () => console.log(`The Car goes at speed ${this.power}`);
}

// Sub-Class
class Cars extends Speeds{
	constructor(brand, name, power){
		super(power);
		this.brand = brand;
		this.name = name;
	}
	detail(){
		console.log(this.brand +" "+ this.name +" "+ this.power);
	}
}

let Car1 = new Cars("BWM","M3 E46/GTR","210 Km/h");
let Car2 = new Cars("Toyota", "Avanza", "180 Km/h");
let Car3 = new Cars("Mazda", "RX-7", "197 Km/h");

// Get data from the Car variable
router.get("/", (req,res) => {
	res.send({Car1, Car2, Car3});
});

module.exports = router;