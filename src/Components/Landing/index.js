import React, {useEffect, useRef, useState, Fragment} from "react";
import {Link} from "react-router-dom";

//UseState : Etat des differents objects
//UseRef : Recuperer les attrituts d'une balise
//UseEffect : Faire des effets
//Fragment : Utiliser des bouts de scripts HTML sans addition de balise supplémentaire

const Landing = () => {

    const [btn, setBtn] = useState(false);
    const refWolverine = useRef(null);

    useEffect(() => {
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true)
        }, 1000)
    }, [])

    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg")
    }
    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg")
    }

    const clearImg = () => {
        if(refWolverine.current.classList.contains("leftImg")){
            refWolverine.current.classList.remove("leftImg")
        }else{
            if(refWolverine.current.classList.contains("rightImg")){
                refWolverine.current.classList.remove("rightImg")
            }
        }
    }

    const displayBtn = btn && (
        <Fragment>
            <div className="leftBox" onMouseOver={setLeftImg} onMouseOut={clearImg}>
                <Link to={"/login"} className="btn-welcome">
                    Connexion
                </Link>
            </div>
            <div className="rightBox" onMouseOver={setRightImg} onMouseOut={clearImg}>
                <Link to={"/signup"} className="btn-welcome">
                    Inscription
                </Link>
            </div>
        </Fragment>
    )

    return (
        <main className="welcomePage" ref={refWolverine}>
            {displayBtn}
        </main>
    );
}

export default Landing;