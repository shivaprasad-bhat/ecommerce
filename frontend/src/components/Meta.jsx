import React from 'react';
import { Helmet } from 'react-helmet';
const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
                name={keywords}
                content="Electronics, buy electronics, shoponline"
            />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Welcome to ShopOnline',
    description: 'Online shopping site built with react',
    keywords: 'Electronics, buy electronics, shoponline',
};

export default Meta;
