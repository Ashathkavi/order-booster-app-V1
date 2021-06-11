
import {NavLink} from 'react-router-dom'
import React from 'react'
import {withRouter} from 'react-router-dom'

class Header extends React.Component {
    

    constructor(props){
        super(props)
    }

    FoodHeader = () => (
        <header>
            <h1>Food Manager</h1>
            <NavLink activeClassName="is-active" to="/food" exact={true}>FoodManagerDashboard-</NavLink>
            <NavLink activeClassName="is-active" to="/food/create">CreateFood-</NavLink>
            <NavLink activeClassName="is-active" to="/" exact={true}>MainBoard</NavLink>
        </header>
    )

    
    OrderHeader = () => (
        <header>
            <h1>Order Manager</h1>
            <NavLink activeClassName="is-active" to="/order" exact={true}>OrderManagerDashboard-</NavLink>
            <NavLink activeClassName="is-active" to="/order/create">CreateOrder-</NavLink>
            <NavLink activeClassName="is-active" to="/" exact={true}>MainBoard</NavLink>
        </header>
    )


    NotFoundHeader = () => (
        <header>
            <h1>Not Found</h1>
        </header>
    )




    render(){
        console.log(this.props.location.pathname)
        if(this.props.location.pathname.indexOf('food') !== -1){
            return this.FoodHeader()
        }else if(this.props.location.pathname.indexOf('order') !== -1){
            return this.OrderHeader()
        }else if(this.props.location.pathname === '/'){
            return <div></div>
        }else{
            return this.NotFoundHeader()
        }
    }
}    

Header.defaultProps = {
    manage:'Food'
}

export default withRouter(Header)
