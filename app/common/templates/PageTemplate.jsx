import React from 'react';
import Header from './header/PageHeader.jsx';
import PageFooter from './footer/PageFooter.jsx';
import Store from '../../baseStore/BaseStore';
import '../../design/styles/stylesheet.scss';

const propTypes = {
  children: React.PropTypes.object.isRequired,
};

class PageTemplate extends React.Component {
  componentWillMount() {
    Store.fetchActiveTournament();
  }

  render() {
    return (
      <div>
        <Header />
        { this.props.children }
        <PageFooter />
      </div>
    );
  }

}

PageTemplate.propTypes = propTypes;
export default PageTemplate;
