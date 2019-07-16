import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactSvgPieChart from 'react-svg-piechart';
import { colors } from '../../constants/ActionConstants';

/*
//var CanvasJSReact = require('canvasjs');
var CanvasJSReact;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

* Free version of CanvasJS did not work - CanvasJS 1.8 seems incompatible with web pack and ES6
 * 
 * Example:  <ResultGraph Question={this.props.question} Answers={this.props.answers}/> */

class ResultGraph extends Component {

    // Required properties: Question, Answers (array) 

    render() {

        var dataPoints = [];
        for (var i = 0; i < this.props.Answers.length; i++) {
            dataPoints.push({ value: this.props.Answers[i].percentage, title: this.props.Answers[i].name, color: colors[i % colors.length] });
        }
        /*
        const options = {
            exportEnabled: true,
            animationEnabled: false,
            title: { text: this.props.Question },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>{y}%",
                showInLegend: "true",
                legendText: "label",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: dataPoints
            }]
        }*/

        return (                        
                <div className="resultGraph">
                    <ReactSvgPieChart height="50px" width="50px" data={dataPoints} />                                    
                </div>
            );
    }

}


function mapStateToProps(state) {
    return {
        
    }
}

export default connect(mapStateToProps, { })(ResultGraph);
