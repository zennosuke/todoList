import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';
import TodoCreater from './components/TodoCreater';
import _ from 'lodash';

class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: this.createHashId(),
          text: 'sample01'
        },
        {
          id: this.createHashId(),
          text: 'sample02'
        }
      ]
    };
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackAddTask = this.callBackAddTask.bind(this);
  }
  createHashId() {
    return Math.random().toString(36).slice(-16);
  }
  callBackRemoveTask(id) {
    let data = _.reject(this.state.data, {'id': id});
    this.setState({
      data: data
    });
  }
  callBackAddTask(val) {
    let nextData = this.state.data;
    nextData.push({id: this.createHashId(), text: val});
    this.setState({
      data: nextData
    });
  }
  render() {
    return (
      <div>
        <TodoCreater callBackAddTask={this.callBackAddTask}/>

        <div className="searchBox">
          <i className="fa fa-search searchBox__icon" aria-hidden="true" />
          <input type="text" className="searchBox__input js-search"
                 value="" placeholder="somothing keyword" />
        </div>

        <TodoList data={this.state.data} callBackRemoveTask={this.callBackRemoveTask}/>

      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);