require('dotenv').config();
mongoose = require('mongoose') ;
require('dotenv').config();

connect=process.env.MONGO_URI;

mongoose.connect(connect, { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log('connect sucssufully'));

PersonSchema = new mongoose.Schema({
  name: {
   require : true, 
   type: String,
  },
  age : Number,
  favoriteFoods : [String],
 }
)

let Person = new mongoose.model('Person',PersonSchema);

let person1= new Person({
  name : 'aziz',
  age : 26,
  favoriteFoods : ['mhajeb','tacos']
})

person1.save((err, savedPerson) => {
  if (err) {
    console.error('Error saving person:', err);
  } else {
    console.log('Person saved successfully:', savedPerson);
  }
});

const createAndSavePerson = (done) => {
  done(null , person1);
};

arrayOfPeople =[
  {
    name : 'aziz',
    age : 26,
    favoriteFoods : ['mhajeb','tacos']
  },
  {
    name : 'hamza',
    age : 96,
    favoriteFoods : ['boyon','tacos']
  }
];

// hna fel post req.body 
// kayen el arrayofpeople li ra7 ypassiwha lel database

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople) 
  .then((docs) => {
  console.log('People saved successfully:', docs);
  // kan lazem nhat docs li houma people fell done method callbac
  done(null , docs);
})
.catch((err) => {
  console.error('Error saving people:', err);
});
};

const findPeopleByName = (personName, done) => {
 // hna kan lazem ndir name : kima doka mandirch personname direct as a param to find function

  Person.find({name : personName})
  .then((data)=>{
    console.log('success finding',data);
    done(null , data);
  })
  .catch((err) => {
    console.error('Error finding people:', err);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food})
  .then((docs) => {
    console.log('People find by food success:', docs);
    done(null ,docs);
  })
  .catch((err) => {
    console.error('Error find by food people:', err);
  });
  
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId})
  .then((docs) => {
    console.log('People find by ID success:', docs);
    done(null ,docs);
  })
  .catch((err) => {
    console.error('Error find by ID people:', err);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId})
  .then((person)=>{
     person.favoriteFoods.push(foodToAdd);
     person.save()
     .then((data)=>{console.log('save successfully',data)
     done(null , data);
    });
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
 Person.findOneAndUpdate(
  {name : personName},
  {age : ageToSet},
  {new : true}
 )
 .then((data)=>{
   console.log('update successefully ',data);
   done(null , data);
 })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId)
  .then((data)=>{
    console.log('delete succeseed',data);
    done(null , data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany(
    {name: nameToRemove}
  ).then(
    (data)=>{
    console.log('delete by names succeseed',data);
      done(null , data);
    }
  )

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}) 
  .sort({name:1})
  .limit(2)
  .select('name favoriteFoods') // hna lazem ykoun binathoum space brk bla madir comma 
  .then((data)=>{
    console.log('querie chain succeed ',data);
    done(null , data);
  })
  .catch(err=>{
    console.log('error chaining query',err)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
