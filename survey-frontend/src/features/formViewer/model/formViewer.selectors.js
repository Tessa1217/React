export const selectCurrentFormList = ({ formViewer }) => formViewer.formList;
export const selectCurrentForm = ({ formViewer }) => formViewer.form;
export const selectQuestions = ({ formViewer }) => formViewer.form?.questions;
