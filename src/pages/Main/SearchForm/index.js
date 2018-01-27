import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectTerm, setTerm, runSearch } from '../../../redux/reducers/search';

import Input from './Input';
import Button from './Button';
import Form from './Form';

class SearchForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    term: PropTypes.string,
    onTermChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    term: '',
    onTermChange: () => {},
    onSubmit: () => {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  handleTermChange = (e) => {
    this.props.onTermChange(e.target.value);
  };

  render() {
    const { className, term } = this.props;

    return (
      <Form className={className} onSubmit={this.handleSubmit}>
        <Input
          value={term}
          onChange={this.handleTermChange}
          autoFocus
          type="text"
          size="68"
        />
        <Button type="submit" />
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  term: selectTerm(state),
});

const mapDispatchToProps = {
  onTermChange: setTerm,
  onSubmit: runSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);
