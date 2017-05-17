import React, {PropTypes} from 'react';
import i18n from 'shared/utils/i18n';

const Translation = ({id}) => (
    <span>{i18n.text(`popup.${id}`)}</span>
);
Translation.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Translation;
