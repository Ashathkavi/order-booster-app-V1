import firebase from 'firebase/app'
import "firebase/database"
import sampleFoods from '../fixtures/sampleFoods'


var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const database = firebase.database()
  
export {firebase, database as default }

/*
database.ref().set({
    name:'Ashath Kavi',
    age:26,
    stressLevel:6,
    job:{
        title:'Softeare developer',
        company:'Google'
    },
    location:{
        city:'Philadelphia',
        country:'United state'
    }
}).then(()=>{
    console.log('Data is Saved')
}).catch((error)=>{
    console.log('This failed', error)

})

database.ref().remove()

sampleFoods().forEach((food)=>{
    database.ref('foods').push({...food})
})

database.ref('foods').on('value', (snapshot)=>{
    const foods = []
    snapshot.forEach((childSnapshot)=>{
        foods.push({
            
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    })
    console.log(foods)
})

database.ref('foods').once('child_removed',(oldChildSnapshot)=>{
    console.log('removed',oldChildSnapshot.val())
})

database.ref('foods').once('child_changed', (ChildSnapshot,a)=>{
    console.log(a , ' get changed',ChildSnapshot.val())
})

*/

/*
database.ref('attribute').set({
    height: 75,
    weight: 150
}).then(()=>{
    console.log('attributes are saved')
}).catch((error)=>{
    console.log('This failed', error)

})
*/
/*
const getDescription = database.ref().on('value', (snapshot)=>{
    const val = snapshot.val()
    console.log(`${val.name} is a ${val.job.title} at ${val.location.city}`)
}, (error) => {
    console.log('Error eith data fetching', error)
})

setTimeout(()=>{
    database.ref('name').set('Ashathkavi')
}, 3500)

setTimeout(()=>{
    database.ref().off('value',getDescription)
}, 7000)

setTimeout(()=>{
    database.ref('name').set('Ashath')
}, 10500)

*/