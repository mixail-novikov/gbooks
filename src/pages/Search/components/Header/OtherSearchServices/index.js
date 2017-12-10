import React from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import { connect } from 'react-redux';

import './style.css';

import { selectTerm } from '../../../../../redux/reducers/search';

const getUrl = (term, tab) => `https://www.google.com/search?q=${encodeURIComponent(term)}${tab ? `&tbm=${tab}` : ''}`;
const getServices = term => ([{
  name: 'All',
  url: getUrl(term),
}, {
  name: 'Images',
  url: getUrl(term, 'isch'),
}, {
  name: 'Videos',
  url: getUrl(term, 'vid'),
}, {
  name: 'News',
  url: getUrl(term, 'nws'),
}, {
  name: 'Books',
  isActive: true,
}]);

const OtherSearchServices = ({ className, term }) => (
  <div className={c('OtherSearchServices', className)}>
    {getServices(term).map(service => (
      <div
        key={service.name}
        className={c('OtherSearchServices__item', { OtherSearchServices__item_active: service.isActive })}
      >
        {service.isActive
          ? service.name
          : <a className="OtherSearchServices__link" href={service.url} target="_blank">{service.name}</a>
        }
      </div>
    ))}
  </div>
);

OtherSearchServices.propTypes = {
  className: PropTypes.string,
  term: PropTypes.string,
};

OtherSearchServices.defaultProps = {
  className: '',
  term: '',
};

const mapStateToProps = state => ({
  term: selectTerm(state),
});

export default connect(mapStateToProps)(OtherSearchServices);
