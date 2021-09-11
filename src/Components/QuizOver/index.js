import React, {Fragment, useEffect, useState} from "react";

const QuizOver = React.forwardRef((props, ref) => {

    const [asked, setAsked] = useState([])

    const {
        levelNames,
        score,
        maxQuestion,
        quizLevel,
        percent,
        loadLevelQuestions
    } = props
    //console.log(ref)
    //console.log(props)

    useEffect(() => {
        setAsked(ref.current)
    })

    const averageGradde = maxQuestion / 2
    const decision = score >= averageGradde ? (
        <Fragment>
            <div className="stepsBtnContainer">
            {
                quizLevel < levelNames.length ? (
                    <Fragment>
                        <p className={"successMsg"}>Bravo, passez au niveau suivant</p>
                        <button onClick={() => loadLevelQuestions(quizLevel )} className="btnResult success">Niveau Suivant</button>
                    </Fragment>
                ):(
                    <Fragment>
                        <p className={"successMsg"}>Bravo, vous êtes un expert</p>
                        <button className="btnResult success gameOver">Niveau Suivant</button>
                    </Fragment>
                )

            }
            </div>
            <div className="percentage">
                <div className={"progressPercent"}>Réussite: {percent}%</div>
                <div className={"progressPercent"}>Note: {score}/{maxQuestion}</div>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className={"stepsBtnContainer"}>
                <p className={"successMsg"}>Vous aviez échoué !!!</p>
            </div>
            <div className="percentage">
                <div className={"progressPercent"}>Réussite: {percent}%</div>
                <div className={"progressPercent"}>Note: {score}/{maxQuestion}</div>
            </div>
        </Fragment>
    )

    const questionAnswer = score >= averageGradde ? (
        asked.map(question => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <button className={"btnInfo"}>Infos</button>
                </tr>
            )
        })
    ) : (
        <tr>
            <td colSpan={"3"}>
                <p style={{textAlign: "center", color: "red"}}>
                    Pas de réponses !
                </p>
            </td>
        </tr>
    )



    return(
        <Fragment>
            {decision}

            <hr/>
            <p>Les réponses aux questions posées:</p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                    <tr>
                        <th>Questions</th>
                        <th>Réponses</th>
                        <th>Infos</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questionAnswer}
                    </tbody>
                </table>
            </div>
        </Fragment>);


    }
)

export default React.memo(QuizOver);