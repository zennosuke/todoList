import React from 'react';
import ClassNames from 'classnames';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      text: this.props.text,
      isDone: false,
      editMode: false
    };
    this.handleClickToggleDone = this.handleClickToggleDone.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
    this.handleClickshowEdit = this.handleClickshowEdit.bind(this);
    this.handleKeyUpCloseEdit = this.handleKeyUpCloseEdit.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }
  handleChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }
  handleClickToggleDone() {
    this.setState(prevState => ({
      isDone: !prevState.isDone
    }));
  }
  handleClickRemove(e) {
    this.props.onRemove(this.state.id);
  }
  handleClickshowEdit() {
    this.setState({
      editMode: true
    });
  }
  handleKeyUpCloseEdit(e) {
    if(e.keyCode === 13 && e.shiftKey === true) {
      this.setState({
        text: e.currentTarget.value,
        editMode: false
      });
    }
  }
  componentWillMount() {
    console.log('componentWillMount');
  }
  render() {
    const classNameLi = ClassNames({
      'list__item': true,
      'list__item--done': this.state.isDone
    });
    const classNameIcon = ClassNames({
      'fa': true,
      'fa-circle-thin': !this.state.isDone,
      'fa-check-circle': this.state.isDone,
      'icon-check': true
    });
    const input = (this.state.editMode) ?
      <input type="text" className="editText" value={this.state.text}
             onChange={this.handleChangeText} onKeyUp={this.handleKeyUpCloseEdit}/> :
      <span onClick={this.handleClickshowEdit}>{this.state.text}</span>;

    return (
      <li className={classNameLi}>
        <i className={classNameIcon} onClick={this.handleClickToggleDone} aria-hidden="true" />
        {input}
        <i className="fa fa-trash icon-trash" onClick={this.handleClickRemove} aria-hidden="true" />
      </li>
    );
  }
}