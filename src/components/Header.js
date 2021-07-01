
import {NavLink} from 'react-router-dom'
import React from 'react'
import {withRouter} from 'react-router-dom'

class Header extends React.Component {
    

    constructor(props){
        super(props)
    }

    FoodHeader = () => (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <div className="header__content-right">
                        <NavLink activeClassName="is-active" to="/food" exact={true} className="header__title"><h1>Food Manager</h1></NavLink>
                    </div>
                    <div className="header__content-left">
                        <NavLink activeClassName="is-active" to="/dashboard" exact={true} className="button button--buttonMainBoard">MainBoard</NavLink>
                        <button onClick= {this.props.startLogout} className="button button--linkLogout">LogOut</button>
                    </div>
                    
                </div>                
            </div>
        </header>
    )

    
    OrderHeader = () => (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <div className="header__content-right">
                        <NavLink activeClassName="is-active" to="/order" exact={true} className="header__title"><h1>Order Manager</h1></NavLink>

                    </div>
                    <div className="header__content-left">
                        <NavLink activeClassName="is-active" to="/dashboard" exact={true} className="button button--buttonMainBoard">MainBoard</NavLink>
                        <button onClick= {this.props.startLogout} className="button button--linkLogout">LogOut</button>
                    </div>
                    
                </div>                
            </div>
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
        }else if(this.props.location.pathname === '/dashboard' || this.props.location.pathname === '/'){
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
