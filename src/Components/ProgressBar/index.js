import React, {Fragment} from "react"


const ProgressBar = ({idQuestion, maxQuestions}) => {
    const actualQuestion = idQuestion + 1;
    const percent = (totalQuestion, questionID ) => {
        return (100 / totalQuestion) * questionID;
    }

    const getPercent = percent(maxQuestions, actualQuestion)


    return(
        <Fragment>
            <div className={"percentage"}>
                <div className={"progressPercent"}>{`Question: ${idQuestion}/${maxQuestions}`}</div>
                <div className={"progressPercent"}>{`Progression: ${getPercent}%`}</div>
            </div>
            <div className={"progressBar"}>
                <div className="progressBarChange" style={{ width: `${getPercent}%`}}>

                </div>
            </div>
        </Fragment>
    )

}

export default React.memo(ProgressBar);