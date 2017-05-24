import PropTypes from 'prop-types';
import React from 'react';
import i18n from 'shared/utils/i18n';

const Translation = ({id}) => (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{__html: i18n.text(`popup.${id}`)}}/>
);
Translation.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Translation;
