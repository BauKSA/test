import React from "react";

import { connect } from "react-redux";
import { get_facilities, get_hiring_priority } from "../../redux/actions";

import './hiring_priority.css'

class HiringPriority extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            facilities: [],
            nurses: [],
            question: 0
        }
    }

    componentDidMount(){
        this.props.get_facilities();
    }

    componentDidUpdate(prevProps){
        if(prevProps.state.facilities !== this.props.state.facilities){
            this.setState({
                facilities: this.props.state.facilities
            }, ()=>{
                this.setState({
                    loading: false
                })
            })
        }

        if(prevProps.state.nurses_id !== this.props.state.nurses_id){
            this.setState({
                nurses: this.props.state.nurses_id
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let facility = document.getElementById('input-facility').value;
        let id;

            for(let i = 0; i < this.state.facilities.length; i++){
                if(this.state.facilities[i].facility_name === facility){
                    id = this.state.facilities[i].facility_id
                }
            }

            this.props.get_hiring_priority(id)
    }

    handleChange = () => {
        this.setState({
            question: 4
        })
    }

    render(){
        if(this.state.loading){
            return(
                <div className="hiring-priority-main-container">
                    <p className="loader">
                        Loading...
                    </p>
                </div>
            )
        }else{
            return(
                <div className="hiring-priority-main-container">
                    <form className="hiring-priority-select-container" onSubmit={this.handleSubmit}>
                        <select className="hiring-priority-select" id="input-facility">
                            {
                                this.state.facilities.map((f)=>{
                                    return (
                                        <option className="hiring-priority-option"
                                        key={f.facility_id}
                                        id={f.facility_id}
                                        >
                                            {f.facility_name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <button className="hiring-priority-button" type="submit">Submit</button>
                    </form>
                    <div className="hiring-priority-nurses-container">
                            {
                                this.state.nurses.map((n)=>{
                                    return (
                                        <span className="hiring-priority-nurse-card" key={n.nurse_id}>
                                            <p className="hiring-priority-nurse-id">
                                                {n.nurse_id}
                                            </p>
                                        </span>
                                    )
                                })
                            }
                    </div>
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
    get_facilities,
    get_hiring_priority
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(HiringPriority);