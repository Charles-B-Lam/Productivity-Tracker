import React  from 'react';
import './TodoStyle.css';

  class TodoDropdown extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'ns'};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Task ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <div class='custom-select'>
                <select value={this.state.value} onChange={this.handleChange}>
                <option value="ns">Not started</option>
                <option value="ip">In progress</option>
                <option value="c">Completed</option>
                </select>
            </div>
          </label>
        </form>
      );
    }
  }

  export default TodoDropdown;