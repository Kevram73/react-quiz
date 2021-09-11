import React, {Fragment, useEffect, useState} from "react";
import {QuizMarvel} from "../quizMarvel";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import Levels from "../Levels"
import ProgressBar from "../ProgressBar"
import QuizOver from "../QuizOver";

toast.configure();

class Quiz extends React.Component {


    state = {
        levelNames : ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question : null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        showWelcomeMsg: false,
        quizEnd: false
    }

    storeDataRef = React.createRef();

    loadQuestions = quizz => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz]
        if(fetchedArrayQuiz.length >= this.state.maxQuestions){

            this.storeDataRef.current = fetchedArrayQuiz
            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest);

            this.setState({
                storedQuestions: newArray
            })
        } else {
            console.log("Pas assez de questions !!!")
        }
    }

   componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
   }

   componentDidUpdate(prevProps, prevState) {
        if(this.state.storedQuestions !== prevState.storedQuestions){


            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
            })
        }

        if(this.state.idQuestion !== prevState.idQuestion){
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }

        if(this.props.myData.pseudo){
            this.showWelcomeMsg(this.props.myData.pseudo)
        }
   }

    showWelcomeMsg = (pseudo) => {
        if(!this.state.showWelcomeMsg){
            this.setState({
                showWelcomeMsg: true
            })
            toast.warn(`Bienvenue ${pseudo}, et bonne chance`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            })
        }

    }

   submitAnswer = (selectedAnswer) => {
        this.setState({
                userAnswer: selectedAnswer,
                btnDisabled: false
            }
        )
   }

   getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;
   
   gameOver = () => {

       const gradepercent = this.getPercentage(this.state.maxQuestions, this.state.score)

       if(gradepercent >= 50){
           this.setState({
               quizLevel: this.state.quizLevel+1,
               percent: gradepercent,
               quizEnd : true
           })
       } else{
           this.setState({
               percent: gradepercent,
               quizEnd : true
           })
       }

   }

   loadLevelQuestions = param => {
        this.setState({

        })
    }

   nextQuestion = () => {
        if(this.state.idQuestion === this.state.maxQuestions - 1){
            this.gameOver()
        } else {
            this.setState(prevState=> ({
                idQuestion: prevState.idQuestion + 1
            }))
        }

        const goodAnswer = this.storeDataRef.current[this.state.idQuestion].answer;
        if(this.state.userAnswer === goodAnswer){
           this.setState(prevState => ({
               score: prevState.score + 1
           }))

            toast.success(`Bravo +1`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        } else {
            toast.error(`Raté 0`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            })
        }
   }

    render() {

        const displayOptions = this.state.options.map((option, index) => {
            return(
                <p
                    key={index}
                    className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                    onClick={() => this.submitAnswer(option)}
                >
                    {option}
                </p>
            )
        })

        return this.state.quizEnd ? (
            <QuizOver
                ref={this.storeDataRef}
                levelNames={this.state.levelNames}
                score={this.state.score}
                maxQuestion={this.state.maxQuestions}
                quizLevel={this.state.quizLevel}
                percent={this.state.percent}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        ) :
         (
            <Fragment>
                <Levels/>
                <ProgressBar
                    idQuestion={this.state.idQuestion}
                    maxQuestions={this.state.maxQuestions}
                />
                <h2>{this.state.question}</h2>
                {displayOptions}

                <button
                    disabled={this.state.btnDisabled}
                    className={"btnSubmit"}
                    onClick={this.nextQuestion}
                >
                    {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"}
                 </button>
            </Fragment>
        );
    }


}

export default Quiz;