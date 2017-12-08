import React, { Component } from 'react';
import c from 'classnames';
import { connect } from 'react-redux';

import './style.css';

import { selectTerm } from '../../../../../redux/reducers/search';

const getUrl = (term, tab) => `https://www.google.com/search?q=${encodeURIComponent(term)}${tab ? `&tbm=${tab}` : ''}`

class OtherSearchServices extends Component {
  render() {
    const { className, term } = this.props;

    const services = [{
      name: 'All',
      url: getUrl(term)
    }, {
      name: 'Images',
      url: getUrl(term, 'isch')
    }, {
      name: 'Videos',
      url: getUrl(term, 'vid')
    }, {
      name: 'News',
      url: getUrl(term, 'nws')
    }, {
      name: 'Books',
      isActive: true,
    }]

    return (
      <div className={c('OtherSearchServices', className)}>
        {services.map(service => (
          <div
            key={service.name}
            className={c('OtherSearchServices__item', {'OtherSearchServices__item_active': service.isActive})}
          >
            {service.isActive
              ? service.name
              : <a className="OtherSearchServices__link" href={service.url} target="_blank">{service.name}</a>
            }
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  term: selectTerm(state),
})

export default connect(
  mapStateToProps,
)(OtherSearchServices);
