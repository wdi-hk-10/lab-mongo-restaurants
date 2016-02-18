// 1.1
db.restaurants.distinct("cuisine").sort()

// 1.2
db.restaurants.find( { "address.zipcode": "11414", "address.street": "Cross Bay Boulevard" } )

// 1.3
db.restaurants.find( { name: /^Willie's/i }, { _id: 0, name: 1, address: 1 } )

// 2.1
db.getCollection('restaurants').find( { name: { $nin: [/Pizza/, /Pizzeria/] }, cuisine: /Pizza/ }, { _id: 0, name: 1 } )

// 2.2w
db.restaurants.find( { cuisine: /^Pizza/, borough: "Queens", "grades.grade": { $nin: [ "B", "C" , "P", "Z" , "Not Yet Graded"] } }, { _id: 0, name: 1 } )

// 3.1
db.getCollection('restaurants').count( { cuisine: "Hamburgers" } )

// 3.2
db.getCollection('restaurants').count( { cuisine: "Hamburgers", borough: "Manhattan" } )

// 3.3
db.getCollection('restaurants').count( { cuisine: "Hamburgers", borough: "Manhattan", name: { $nin: [/McDonald/i] } } )

// 3.4
db.getCollection('restaurants').count( { cuisine: "Hamburgers", borough: "Manhattan", name: { $nin: [/McDonald/i, /Burger King/i] } } )

// 3.5
db.getCollection('restaurants').distinct( "address.street", { cuisine: "Hamburgers", borough: "Manhattan", name: { $nin: [/McDonald/i, /Burger King/i] } } )


// 3.6
db.getCollection('restaurants').find( { cuisine: "Hamburgers", borough: "Manhattan", "address.street": "Pearl Street" }, { _id: 0, name: 1 } )
// Burger Burger

// Bonus
