
import React from 'react';
import {COMPONENT, PROPS, WIDGET_TYPE_SCROLLVIEW, WIDGET_TYPE_TOP_BOTTOM, WIDGET_TYPE_KEY_INFO, WIDGET_TYPE_NUMBER_STAMP, DASHBOARD_TYPE_SCROLLVIEW} from '../utilities/Constants';
import ScrollViewWidget from '../components/widgets/ScrollViewWidget';
import DashboardScrollViewWidget from '../components/widgets/DashboardScrollViewWidget';
import NumberStampWidget from '../components/widgets/NumberStampWidget';
import KeyInfoWidget from '../components/widgets/KeyInfoWidget';
import TopBottom from '../components/widgets/TopBottom';

export default register = (appCtx) => {
    appCtx
    .registerWidget(WIDGET_TYPE_SCROLLVIEW, { [COMPONENT]: <ScrollViewWidget />, [PROPS]: null })
    .registerWidget(DASHBOARD_TYPE_SCROLLVIEW, { [COMPONENT]: <DashboardScrollViewWidget />, [PROPS]: null})
    .registerWidget(WIDGET_TYPE_NUMBER_STAMP, { [COMPONENT]: <NumberStampWidget />, [PROPS]: null})
    .registerWidget(WIDGET_TYPE_KEY_INFO, { [COMPONENT]: <KeyInfoWidget />, [PROPS]: null})
    .registerWidget(WIDGET_TYPE_TOP_BOTTOM, { [COMPONENT]: <TopBottom />, [PROPS]: null});

}