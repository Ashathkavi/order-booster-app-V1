import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The Info is: {props.infoMessage}</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please dont share</p>}

            <WrappedComponent {...props}/>
        </div>
    )
}


const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
        {
            props.isAuthenticated ? (
                <WrappedComponent {...props}/>
            ):(
                <p>Pleasse login to get autheticatede</p>
            )
        }            
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)


//ReactDOM.render(<AdminInfo isAdmin={false} infoMessage='These are the details from HOC'/>, document.getElementById('app'))
ReactDOM.render(<AuthInfo isAuthenticated={true} infoMessage='These are the details from HOC'/>, document.getElementById('app'))