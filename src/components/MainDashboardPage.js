import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

const now = moment()



export const MainDashboardPage = ({startLogout}) => {
    return(
        <div>
            <header className="header">
                <div className="content-container">
                    <div className="header__title"><h1>Order Booster</h1></div>
                    <button onClick= {startLogout}>LogOut</button>
                    <h4>{now.format('MMM Do, YYYY')}</h4>
                </div>              
            </header>
            <p><Link  to="/food"> Manage Food</Link></p>
            <p><Link  to="/order"> Manage Order</Link></p> 
        </div>
        
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(MainDashboardPage)