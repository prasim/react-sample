import React from 'react';
import ExpansionPanelSummaryStyles from './DayOverride'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ExpandMoreIcon   from '@material-ui/icons/ExpandMore';
import Moment from 'moment';
import styles from './Day.css';
import agent from '../../agent';
import Tasks from '../Tasks/Tasks'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
    DAY_PAGE_LOADED,
    DAY_ADDED
  } from '../../constants/actionTypes';

const mapStateToProps = state => ({
    ...state.days,
    common: state.common
  });
  
const mapDispatchToProps = dispatch => ({
    onLoad: (payload) =>
    dispatch({ type: DAY_PAGE_LOADED, payload }),
    onAddDay: payload =>
    dispatch({ type: DAY_ADDED, payload }),
});
class Day extends React.Component {
    componentWillMount() {
        const promise = agent.Days.getAll(this.props.common.currentUser.username);
        this.props.onLoad(promise);
        promise.then((res) => {
            console.log(this.props);
            const day = {};
            var days = this.props.days;
            if(days.length) {
                const lastDate = Moment(days[days.length-1].createdAt).startOf('day');
                const today = Moment().startOf('day');
                if(today.diff(lastDate, 'days')) {
                    day.dateCreated = today.format("DD-MM-YYYY")
                    this.props.onAddDay(agent.Days.create(day));
                }
            } else {
                const today = Moment().startOf('day');
                day.dateCreated = today.format("DD-MM-YYYY")
                this.props.onAddDay(agent.Days.create(day));
            }
        }); 
    }
    constructor(props) {
        super(props);
    }
    state = {
        expanded: null,
    };
    getDisplayDate = (day) => {
        if(day) {
            const moment = Moment(day.createdAt);
            const weekOfMonth =  Math.ceil(moment.date() / 7);
            return "W"+weekOfMonth+" D"+moment.isoWeekday() + " " + moment.format("ddd Do MMM");
        }
    };
    saveDay = () => {
        const day = {};
    
        agent.Days.create(day);
    }
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
    getDate = () => {
        console.log(this.props.days);
    }
    render() {
        const { classes } = this.props;
        const { expanded } = this.state;
        const renderedDays = this.props.days ? 
        this.props.days.map((day, index) => {
            return <div key={index}>
                <ExpansionPanel expanded={expanded === 'panel'+index} onChange={this.handleChange('panel'+index)}>
                    <ExpansionPanelSummary classes={classes} expandIcon={<ExpandMoreIcon/>}>
                        <span>{this.getDisplayDate(day)}</span>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={styles['expansion-details']}>
                        {day.tasks.map((task, index) => {
                            return <Tasks task={task} key={index} date={Moment(day.createdAt).format("DD-MM-YYYY")}/>
                        })}
                        <Tasks input="true"  date={Moment(day.createdAt).format("DD-MM-YYYY")}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
            })
        :
        (<div>Loading....</div>)
        return (<div className={styles.box}>{renderedDays}</div>)
    }
  }
  Day.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ExpansionPanelSummaryStyles)(Day));
  