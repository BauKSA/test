import React from 'react'

import { connect } from "react-redux";
import { hiring_posibilities } from "../../redux/actions";

class Hiring extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            hiring: []
        }
    }

    componentDidMount(){
        this.props.hiring_posibilities()
    }

    componentDidUpdate(prevProps){
        if(prevProps.state.hiring !== this.props.state.hiring){
            this.setState({
                hiring: this.props.state.hiring
            }, ()=>{
                this.setState({
                    loading: false
                })
            })
        }
    }

    render(){
        if(this.state.loading){
            return(
                <div className="question-main-container">
                    <p className="loader">Loading...</p>
                </div>
            )
        }else{
            return(
                <div className="question-main-container">
                    <p className="question-description">
                    Using the same tables, write a query that will return the nurse’s ID, nurse’s name, the
                    nurse type, and the total number of jobs that each nurse can possibly still get hired for.
                    Each nurse can only be hired one time for each matching job and if the nurse is already
                    hired for a job, that job should not count towards the total. If a job id is already
                    completely filled, that job should also not count towards the total. Order the results by the
                    nurse_id in ascending order.

                    </p>
                    <span className="question-grid">
                        {
                            this.state.hiring.map((h)=>{
                                return (
                                    <span className="question-card"
                                    key={`${h.nurse_id}`}
                                    >
                                        <h1 className="question-title">
                                            {h.nurse_name}
                                        </h1>
                                        {h.nurse_id}, {h.nurse_type}
                                        <br />
                                        <br />
                                        Hiring posibilities: {h.jobs.length}
                                        <span className='question-jobs'>
                                            {
                                                h.jobs.map((j)=>{
                                                    return (
                                                        <span className='job-card' key={`${h.nurse_id}${j.job_id}`}>
                                                            Job ID: {j.job_id}
                                                            <br />
                                                            Position: {j.nurse_type_needed}
                                                            <br />
                                                            Facility: {j.facility_id}
                                                        </span>
                                                    )
                                                })
                                            }
                                        </span>
                                    </span>
                                )
                            })
                        }
                    </span>
                </div>
            )
        }
    }

}

function mapStateToProps(state) {
    return {
        state: state
    }
}

const mapDispatchToProps = {
    hiring_posibilities
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(Hiring);