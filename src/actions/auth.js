import database, {firebase, googleAuthProvider} from '../firebase/firebase'
import moment from 'moment'

export const login = (uid, name, role, createdAt) => ({
    type:'LOGIN',    
    uid,
    name,
    role,
    createdAt

})

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }
}


export const logout = () => ({
    type:'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}

export const checkUserAvailability =  (user) => {
    
    return (dispatch) => {
        let userAvailabiliity = false
        return database.ref(`users/${user.uid}`).once('value')
            .then((snap)=>{
                userAvailabiliity = !!snap.val()
                console.log(userAvailabiliity, 'userAvailabiliity')
                if(userAvailabiliity){
                    dispatch(login(user.uid, snap.val().name, snap.val().role, snap.val().createdAt))
                }else{
                    dispatch(login(user.uid, user.displayName, 'unknown', 0))
                }
                console.log(userAvailabiliity, "userAvailabiliity")                
            })
            .catch((error)=>console.log('User availbaility request failed :', error))
        
        
    }
    
}


export const setAsMemeber = (userId, name) => {
    console.log(userId, "running set as member") 
    const createdAt = moment().valueOf()
    return (dispatch) => {
        return database.ref(`users/${userId}`).set({
            name,
            role: 'member',
            createdAt:createdAt
        }).then(()=>dispatch(login(userId, name, 'member', createdAt)))
            .catch((error)=>console.log('User creating request failed :', error))
    }
    
}