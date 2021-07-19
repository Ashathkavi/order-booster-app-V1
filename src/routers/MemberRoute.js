import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'


export const MemberRoute = ({
    isAuthenticated, 
    component:Component,
    autherizedAs,
    ...restProps
}) => (

    <Route {...restProps} component={(props) => {
        console.log(autherizedAs)
        if(isAuthenticated && (
            autherizedAs==='admin' || 
            autherizedAs==='manager' ||
            autherizedAs==='member' || 
            autherizedAs==='handler' ||
            autherizedAs==='unknown' ||  
            autherizedAs==='deliverer'||
            autherizedAs==='cook'

            )){
            return <Component {...props} autherizedAs = {autherizedAs}/>
        }else{
            return <Redirect to = "/"/>
        }
    }}/> 
)


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    autherizedAs:state.auth.role
})

export default connect(mapStateToProps)(MemberRoute)