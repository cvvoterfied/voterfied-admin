import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import ResultLegendRow from './ResultLegendRow';
import { colors } from '../../constants/ActionConstants';

class ResultLegend extends Component {

    render() {

        var dataPoints = [];
        var total = 0;        
        for (var i = 0; i < this.props.Answers.length; i++) {
            dataPoints.push({ value: this.props.Answers[i].percentage, title: this.props.Answers[i].name, color: colors[i % colors.length], pos: i });
            total += this.props.Answers[i].votecount;
        }
        
        return (
            
            <div className="shadowBox stats">
                <div className="resultTitle">---- RESULTS ----</div>
                <ResultLegendRow data={dataPoints} />
                <div className="totalCount"><b>Total Count</b><br/>{total}</div>
            </div>
        )
    }


}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, {})(ResultLegend);
