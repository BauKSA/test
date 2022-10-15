import React from "react";

import JobSpot from "../job_spot/job_spot";
import HiringPriority from "../hiring_priority/hiring_priority";
import Facilities from "../facilities/facilities";

import './main-page.css'
import Hiring from "../hiring/hiring";

class MainPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            question: 0
        }
    }

    handleChange = (e) => {
        let buttons = document.getElementsByClassName('main-page-button')
        for(let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "white"
        }

        if(e.target.id !== "clear"){
            e.target.style.backgroundColor = "rgba(0, 0, 0, 0.15)";
        }
        
        if(e.target.id === "question-4"){
            this.setState({
                question: 4
            })
        }else if(e.target.id === "question-5"){
            this.setState({
                question: 5
            })
        }else if(e.target.id === "question-6"){
            this.setState({
                question: 6
            })
        }else{
            this.setState({
                question: 0
            })
        }
    }

    getQuestion = () => {
        if(this.state.question === 4){
            return <JobSpot />
        }else if(this.state.question === 5){
            return <Hiring />
        }else if(this.state.question === 6){
            return <Facilities />
        }
    }

    render(){
        return(
            <div className="main-page-container">
                <HiringPriority />
                <span className="main-page-button-container">
                    <button className="main-page-button"
                    id="question-4"
                    onClick={this.handleChange}
                    >
                        Execute Q4 Query
                    </button>
                    <button className="main-page-button"
                    id="question-5"
                    onClick={this.handleChange}
                    >
                        Execute Q5 Query
                    </button>
                    <button className="main-page-button"
                    id="question-6"
                    onClick={this.handleChange}
                    >
                        Execute Q6 Query
                    </button>
                    <button className="main-page-button"
                    id="clear"
                    onClick={this.handleChange}
                    >
                        Clear
                    </button>
                </span>
                <span className="question-result-container">
                    {
                        this.getQuestion()
                    }
                </span>
            </div>
        )
    }
}

export default MainPage;