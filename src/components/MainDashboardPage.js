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
                    <div className="header__content">
                        <div className="header__content-left">
                            <div className="header__title"><h1>Order Booster</h1></div>
                        </div>
                        <div className="header__content-right">
                            
                            <h4 className="page-header__date">{now.format('MMM Do, YYYY')}</h4>
                            <button className="button--buttonMainBoard" onClick= {startLogout}>LogOut</button>
                        </div>
                    
                    </div> 
                </div>              
            </header>
            <div className="main-container">
                <div className="content-container ">
                    <div className="content-container--main-board">
                        <Link className="content-link"  to="/food"> <div className="link-container"><h1>Manage Foods</h1></div></Link>
                        <Link className="content-link"  to="/order"> <div className="link-container"><h1>Manage Orders</h1></div></Link>
                        <Link className="content-link" to="/dashboard"> <div className="link-container"><h1>Manage Expenses</h1></div></Link>
                    </div>
                    <div className="content-container--main-board">
                        <Link  to="/dashboard"> <div className="link-container">+</div></Link>
                        <Link  to="/dashboard"> <div className="link-container"></div></Link>
                        <Link  to="/dashboard"> <div className="link-container"></div></Link>
                    </div>
                    
                </div>
            </div>             
        </div>
        
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(MainDashboardPage)
