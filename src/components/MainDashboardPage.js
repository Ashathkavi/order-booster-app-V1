import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

const now = moment()



const MainDashboardPage = () => {
    return(
        <div>
            <h4>{now.format('MMM Do, YYYY')}</h4>
            <h3>This from Main dashboard componrnet</h3>
            <p><Link  to="/food"> Manage Food</Link></p>
            <p><Link  to="/order"> Manage Order</Link></p> 
        </div>
    )}

export default MainDashboardPage