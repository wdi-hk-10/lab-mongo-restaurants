// warm up
// question 1
db.restaurants.distinct("cuisine").sort()
//question 2
db.restaurants.find(
  {
    "address.street":"Crossbay Boulevard",
    "address.zipcode": "11414"
  }
).pretty()

//question 3
db.restaurants.find(
  {
    "cuisine":"Latin (Cuban, Dominican, Puerto Rican, South & Central American)",
    "name":/^Willie/
  },
  {
    "name":1, "address":1, _id:0
  }
)

//Pizza
//question 1
db.restaurants.find({cuisine:/Pizza/, name:{$nin:[/Pizza/,/Pizzeria/]}}).pretty()
//question 2
db.restaurants.find({cuisine:/Pizza/, borough:"Queens", "grades.grade":{$nin:["B","Z","C","P","Not Yet Graded"]}}).pretty()

//Hamburgers
//question 1
db.restaurants.find({cuisine:"Hamburgers"})
//question 2
db.restaurants.find({cuisine:"Hamburgers",borough:"Manhattan"})
//question 3
db.restaurants.find({cuisine:"Hamburgers",borough:"Manhattan",name:{$nin:[/Mcdonald/]}})
//question 4
db.restaurants.find({cuisine:"Hamburgers",borough:"Manhattan",name:{$nin:[/Mcdonald/, "Burger King"]}})
//question 5
db.restaurants.distinct("address.street", {cuisine:"Hamburgers", borough:"Manhattan", name:{$nin:[/Mcdonald/, "Burger King"]}})
//question 6
db.restaurants.find({cuisine:"Hamburgers",borough:"Manhattan",name:{$nin:[/Mcdonald/,"Burger King"]},"address.street":"Pearl Street"},{name:1,_id:0})
//question 6 answer
{ "name" : "Burger Burger" }

//Hard
//1