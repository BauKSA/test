import React from "react";

import { connect } from "react-redux";
import { get_job_spot } from "../../redux/actions";

import '../question.css'

class JobSpot extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            job_spot: []
        }
    }

    componentDidMount(){
        this.props.get_job_spot()
    }

    componentDidUpdate(prevProps){
        console.log(this.props)
        if(prevProps.state.job_spot !== this.props.state.job_spot){
            this.setState({
                job_spot: this.props.state.job_spot
            }, ()=>{
                this.setState({
                    loading: false
                })
            })
        }
    }

    render(){
        if(this.state.loading){
            console.log("loading")
            return(
                <div className="question-main-container">
                    <p className="loader">Loading...</p>
                </div>
            )
        }else{
            return(
                <div className="question-main-container">
                    <p className="question-description">
                        Using the provided tables, write a query that will return the number of remaining spots
                        each job has. The remaining number of spots will be equal to the total number of nurses
                        needed minus the number of nurses that are already hired for that job. Order the results
                        by the job_id in ascending order
                    </p>
                    <span className="question-grid">
                        {
                            this.state.job_spot.map((j)=>{
                                return (
                                    <span className="question-card"
                                    key={`${j.job_id}${j.nurse_type_needed}`}
                                    >
                                        Job ID: {j.job_id}
                                        <h1 className="question-title">
                                            Needed {j.total_number_nurses_needed}: {j.nurse_type_needed}
                                        </h1>
                                        Facility: {j.facility_id}
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
    get_job_spot
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(JobSpot);