import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResultLegendRow extends Component {

    render() {
        return (
        this.props.data.map(
            (j) =>
                <div className="legendBox">
                    <div className={j.color}><b>{j.title}</b></div>
                    <div className="">{j.value.toFixed(2)}%</div>
                </div>
            )
        )
    }


}

function mapStateToProps(state) {
    return {
        
    }
}

export default connect(mapStateToProps, {})(ResultLegendRow);
