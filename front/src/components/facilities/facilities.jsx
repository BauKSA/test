import React from "react";

import { connect } from "react-redux";
import { facilities_shifts } from "../../redux/actions";

class Facilities extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            facilities: []
        }
    }

    componentDidMount(){
        this.props.facilities_shifts()
    }

    componentDidUpdate(prevProps){
        if(prevProps.state.shifts !== this.props.state.shifts){
            this.setState({
                facilities: this.props.state.shifts
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
                    Using the same tables, write a query that will return the name of each facility and the
                    name of the nurse that has been hired for the most number of shifts at each of those
                    facilities. Order the results by the facility_name in ascending order
                    </p>
                    <span className="question-grid">
                        {
                            this.state.facilities.map((f)=>{
                                return (
                                    <span className="question-card"
                                    key={`${f.nurse_id}${f.facility_id}`}
                                    >
                                        <h1 className="question-title">
                                            {f.facility_name}
                                        </h1>
                                        More shifts: {f.nurse_name}
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
    facilities_shifts
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(Facilities);