import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';
import TodoCreater from './components/TodoCreater';
import _ from 'lodash';
import Search from './components/Search';

class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: this.createHashId(),
          text: 'sample01',
        },
        {
          id: this.createHashId(),
          text: 'sample02',
        }
      ],
      searchText: ''
    };
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackAddTask = this.callBackAddTask.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
  }
  createHashId() {
    return Math.random().toString(36).slice(-16);
  }
  callBackSearch(val) {
    this.setState({
      searchText: val
    });
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
  filterCollection(elm) {
    const regexp = new RegExp('^' + this.state.searchText, 'i');
    return (elm.text.match(regexp));
  }
  render() {
    const data = (this.state.searchText) ? this.state.data.filter(this.filterCollection) : this.state.data;
    return (
      <div>
        <TodoCreater callBackAddTask={this.callBackAddTask}/>

        <Search callBackSearch={this.callBackSearch}/>

        <TodoList data={data} callBackRemoveTask={this.callBackRemoveTask}/>

      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);