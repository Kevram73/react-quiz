import React, {useState, useEffect, useContext} from "react";
import {FirebaseContext} from "../Firebase";

const Logout = () => {

    const [checked, setChecked] = useState(false)

    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        if(checked) {
            firebase.signOutUser()
        }
    }, [checked, firebase]);

    const handleChange = event => {
        setChecked(event.target.checked)
    }

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input type="checkbox" checked={checked} onChange={handleChange}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}
export default Logout;