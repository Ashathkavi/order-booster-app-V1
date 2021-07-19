import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'


export const DelivererRoute = ({
    isAuthenticated, 
    component:Component,
    autherizedAs,
    ...restProps
}) => (

    <Route {...restProps} component={(props) => {
        if(isAuthenticated && (autherizedAs==='deliverer' || autherizedAs==='admin')){
            return <Component {...props}/>
        }else{
            return <Redirect to = "/"/>
        }
    }}/> 
)


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    autherizedAs:state.auth.role
})

export default connect(mapStateToProps)(DelivererRoute)