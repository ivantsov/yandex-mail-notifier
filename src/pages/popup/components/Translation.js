import PropTypes from 'prop-types';
import React from 'react';
import i18n from 'shared/utils/i18n';

const Translation = ({
  id,
  data,
}) => {
  const formattedData = Object.keys(data).map(key => data[key]);
  const translation = i18n.text(`popup.${id}`, formattedData);

  if (!translation) {
    throw new Error(`Translation for "${id}" key is missing`);
  }

  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{__html: translation}}/>;
};
Translation.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object,
};
Translation.defaultProps = {
  data: {},
};

export default Translation;
