// ### Warm up

// 1. List out all available `cuisine` from the **whole dataset** and sort them in alphabetical order.

db.restaurants.distinct("cuisine").sort()


// 2. Find out all available `cuisine` from the restaurants that are located on `Cross Bay Boulevard` and whose address uses zip code `11414`.

db.restaurants.distinct("cuisine", { "address.zipcode": "11414", "address.street": "Cross Bay Boulevard" } )


// 3. Find the name and address of the `Steak House` owned by your WDI-HK-10 instructor (Hint: You may want to use regular expression).

db.restaurants.find( { name: /^Willie/ } , { _id: 0 , name: 1 , address: 1 } )



// ### Pizza

// 1. List out the name of all restaurants which **contain** the word `Pizza` in the *cuisine* but  **DO NOT contain** the word `Pizza` or `Pizzeria` in the restaurant **name** (Hint: use regular expression).

db.restaurants.find( { cuisine: /Pizza/, name: { $nin: [ /Pizza/ , /Pizzeria/ ] } } , { _id: 0 , name: 1 } )


// 2. List out the names of all *straight A* (i.e. the restaurant has only received `A` grade ever) restaurants which contain the word `Pizza` in the `cuisine` and are located in the `Queens` *borough* (Hint: you may want to first find out how many available grade values we have in the entire dataset).

db.restaurants.find( { cuisine: /^Pizza/, borough: "Queens", "grades.grade": { $nin: [ "B", "C" , "P", "Z" , "Not Yet Graded" ] } } , { _id: 0 , name: 1 } )

// Grades are A , B , C , Not Yet Graded , P , Z



// ### Hamburgers

// 1. You are hungry and feel like having a hamburger. Find the number of restaurants listed `Hamburgers` as their main *cuisine*.

db.restaurants.count( { cuisine: "Hamburgers" } ) // returns 433


// 2. Geez, there are way too many of them. Let's narrow down our search. You are in Manhattan right now so let's find how many restaurants listed `Hamburgers` as their main `cuisine` in the `Manhattan` *borough*.

db.restaurants.count( { cuisine: "Hamburgers", borough: "Manhattan" } ) // returns 124


// 3. Let's have something nice and get rid of the `McDonald's` in the results. Find how many restaurants listed `Hamburgers` as their main `cuisine` in `Manhattan` *and* exclude all `Mcdonald's` (Note: In the data set, _McDonald's_ was presented in inconsistent ways, e.g. `McDonald's` and `McDonald'S`. So please use the regular expression `/McDonald/` in your query).

db.restaurants.count( { cuisine: "Hamburgers", borough: "Manhattan", name: { $nin: [ /^Mcdonald/ ] } } ) // returns 71


// 4. Hmm... we are getting closer. Let's also get rid of `Burger King` as well.

db.restaurants.count( { cuisine: "Hamburgers", borough: "Manhattan", name: { $nin: [ "Burger King", /^Mcdonald/ ] } } ) // returns 57


// 5. There are still plenty of choices. Maybe you should just pick one closer to your home. Find out the list of `distinct` `street` based on the results of Question 4.

db.restaurants.distinct("address.street", { cuisine: "Hamburgers", borough: "Manhattan", name: { $nin: [ "Burger King", /^Mcdonald/ ] } } )


// 6. Alright, you are just a block away from `Pearl Street`. Find the `name` of the `Hamburger` restaurant (i.e. your query should return the name of the restaurant only) on `Pearl Street`. Your query should now yield exactly *one* restaurant. What is it? (Submit the query and also the name of the restaurant as a comment)

db.restaurants.distinct("name", { "address.street": "Pearl Street" , cuisine: "Hamburgers", borough: "Manhattan", name: { $nin: [ "Burger King", /^Mcdonald/ ] } } , {_id: 0 , name: 1} )
// returns [ "Burger Burger" ]



// Hard (You need to do some research first)
// Find the name of the restaurants which listed Japanese as their main cuisine and have exactly 9 grades

db.restaurants.find( { cuisine: "Japanese" , "grades": { $size: 9 } } , { _id: 0 , name: 1 } )



// Jules additional queries...

// WARM UP
db.getCollection("restaurants").distinct("cuisine").sort() // or
db.restaurants.distinct("cuisine").sort()

db.restaurants.find( {"address.zipcode": "11414", "address.street": "Cross Bay Boulevard"} )


// PIZZA
db.restaurants.count( { cuisine: /^Pizza/ } ) //returns 1,631 - all restaurants which **contain** the word `Pizza` in the *cuisine*
db.restaurants.count( { name: { $nin: [ /Pizza/ ] } } ) // returns 24,099 - all restaurants that **DO NOT contain** the word `Pizza` in the restaurant **name**
db.restaurants.count( { name: { $nin: [ /Pizzeria/ ] } } ) // returns 24,969 - all restaurants that **DO NOT contain** the word `Pizzeria` in the restaurant **name**
db.restaurants.count( { cuisine: /^Pizza/, name: [/^Pizz.*/ } ) // returns 94 - all restaurants which **contain** the word `Pizza` in the *cuisine* AND the word `Pizza` or `Pizzeria` in the restaurant **name**
db.restaurants.count( { cuisine: /^Pizza/, name: { $not: /^Pizz.*/ } } ) // returns 1,537 - **contain** the word `Pizza` in the *cuisine* BUT **DO NOT contain** the word `Pizza` or `Pizzeria` in the restaurant **name**


db.restaurants.count( { cuisine: /^Pizza/, borough: "Queens"}) // returns 379 - restaurants which contain the word `Pizza` in the `cuisine` and are located in the `Queens` *borough*
db.restaurants.count( {"grades.grade": "A" } ) // returns 23,440
db.restaurants.count( {"grades.grade": "B" } ) // returns 8,280
db.restaurants.count( {"grades.grade": "C" } ) // returns 2,708
db.restaurants.count( {"grades.grade": "Not Yet Graded" } ) // returns 525
db.restaurants.count( {"grades.grade": "P" } ) // returns 1,154
db.restaurants.count( {"grades.grade": "Z" } ) // returns 1,337
db.restaurants.count( {"grades.grade": { $nin: [ "B", "C" , "P", "Z" , "Not Yet Graded" ] }} ) // returns 14,481
db.restaurants.count( {cuisine: /^Pizza/, borough: "Queens", "grades.grade": { $nin: [ "B", "C" , "P", "Z" , "Not Yet Graded"] } } , { _id: 0 , name: 1 } ) // returns 209



// HAMBURGERS
db.restaurants.count( { name: { $nin: [ "Burger King", /^Mcdonald/ ] } } ) // returns 25,043 - ALL restaurants in NYC that are not McDs or BKs
db.restaurants.count( { $or: [ { name: "Burger King" }, { name: /^Mcdonald/ } ] } ) // returns 316 - All Burger Kings & McDonalds in NYC
db.restaurants.count( { cuisine: "Hamburgers", borough: "Manhattan", $or: [ { name: "Burger King" }, { name: /^Mcdonald/ } ] } ) // returns 67 - All BKs & McDs in Manhattan
db.restaurants.count( { cuisine: "Hamburgers", borough: "Manhattan", name: /^Mcdonald/ } ) // returns 53 - All McDs in Manhattan
db.restaurants.count( { cuisine: "Hamburgers", borough: "Manhattan", name: "Burger King" } ) // returns 14 - All BKs in Manhattan


