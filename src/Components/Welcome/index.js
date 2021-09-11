import React, {Fragment, useContext, useEffect, useState} from "react";
import {FirebaseContext} from "../Firebase";
import Logout from '../Logout';
import Quiz from '../Quiz';

const Welcome = (props) => {

    const [userSession, setUserSession] = useState(null)
    const [myData, setMyData] = useState({})

    const firebase = useContext(FirebaseContext)
    useEffect(() => {

        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');
        })

        if(userSession !== null){
            firebase.user(userSession.uid)
                .get()
                .then( doc => {
                    if(doc && doc.exists){
                        const myData = doc.data()
                        setMyData(myData)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

        return () => {
            listener()
        }
    }, [userSession])

    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
        </Fragment>

    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout/>
                <Quiz myData={myData}/>
            </div>
        </div>
    )

}

export default Welcome;