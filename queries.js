Warm Up
1. db.getCollection('restaurants').distinct("cuisine").sort()
2.db.getCollection('restaurants').distinct("cuisine",{"address.street":"Cross Bay Boulevard", "address.zipcode":"11414"})
3.db.getCollection('restaurants').find({$and:[{name:{$regex: /Willie/}},{name:{$regex: /Steak/}}]})

Pizza
1.db.getCollection('restaurants').find({$and:[{cuisine: {$regex: /Pizza/}}, {name: {$not: /Pizza/}}, {name: {$not: /Pizzeria/}}]})
2.db.getCollection('restaurants').find({$and:[{cuisine:{$regex:/Pizza/}},{borough:"Queens"},{"grades.grade":{$nin: ["B","Z","C","P","Not Yet Graded"]}}]})

Hamburgers
1.db.getCollection('restaurants').count({cuisine:{$regex: /Hamburger/}})
2.db.getCollection('restaurants').count({cuisine:{$regex: /Hamburger/}, borough:"Manhattan"})
3.db.getCollection('restaurants').count({$and:[{cuisine:{$regex: /Hamburger/}}, {borough:"Manhattan"}, {name: {$not: /Mcdonald/}}]})
4.db.getCollection('restaurants').count({$and:[{cuisine:{$regex: /Hamburger/}}, {borough:"Manhattan"}, {name: {$not: /Mcdonald/}},{name: {$not: /Burger King/}}]})
5.db.getCollection('restaurants').distinct("address.street", {$and:[{cuisine:{$regex: /Hamburger/}}, {borough:"Manhattan"}, {name: {$not: /Mcdonald/}},{name: {$not: /Burger King/}}]})
6.db.getCollection('restaurants').find({$and:[{"address.street":"Pearl Street"},{cuisine:{$regex: /Hamburger/}}, {borough:"Manhattan"}, {name: {$not: /Mcdonald/}},{name: {$not: /Burger King/}}]})
//The burger place you visit is called "Burger Burger"

Hard
1. db.getCollection('restaurants').find({$and:[{cuisine:"Japanese"},{grades: {$size: 9}}]})