import CustomSnackbar from './components/CustomSnackbar';
import React from 'react';

export default registerApplication = (application) => {
    application.registerWidget('Snackbar', { 'component': <CustomSnackbar />, 'props': { 'user': 'Zack & Cody' } });
}
