export default (state={}, action) => {
    switch(action.type){
        case 'LOGIN':
            return{
                uid:action.uid,
                role:action.role,
                createdAt:action.createdAt
            }
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}