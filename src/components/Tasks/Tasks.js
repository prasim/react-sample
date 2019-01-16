import React from 'react';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import agent from '../../agent';
import styles from './Tasks.css';
import { connect } from 'react-redux';
import {
  TASK_ADDED,
  UPDATE_TASK
} from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.days,
  common: state.common
});

const mapDispatchToProps = dispatch => ({
  onAddTask: payload =>
    dispatch({ type: TASK_ADDED, payload }),
  onUpdateTask: payload =>
    dispatch({ type: UPDATE_TASK, payload })
});

class Tasks extends React.Component {
  state = {
    task: ''
  };
  keyPress = e => {
    if(e.keyCode == 13){
      const payload = agent.Tasks.addTask(this.props.date,
        this.props.common.currentUser.username, 
        {
          'body': e.target.value
        });
      this.props.onAddTask(payload);
      let self = this;
      payload.then(()=>{
        self.setState({
          task: ''
        });
      });
    }
  }
  updateTask = (name) => event => {
    if(name === 'checkbox') {
      if(event.target.checked) {
        this.props.task.state = 1;
      } else {
        this.props.task.state = 0;
      }
      const payload = agent.Tasks.updateTask(this.props.date,
        this.props.common.currentUser.username, 
        this.props.task);
      this.props.onUpdateTask(payload);
    } else {

    }
  }
  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    let div = <div/>
      if (this.props.input) {
        div = (<div class={styles['input-div']}><Input
        placeholder="Placeholder"
        className={styles['input-text']}
        value={this.state.task}
        onChange={this.handleChange('task')}
        onKeyDown={this.keyPress}
        inputProps={{
          'aria-label': 'Description',
        }}/></div>)
      } 
      else {
        div = (<div class={styles['input-div']}><Checkbox
          checked={this.props.task.state}
          onChange={this.updateTask('checkbox')}
          value="checkedA"
          />
          <Input
          placeholder="Placeholder"
          value={this.props.task.body}
          className={styles['input-text']}
          onChange={this.updateTask('input')}
          inputProps={{
            'aria-label': 'Description',
          }}/></div>)
      }
    return (div);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
