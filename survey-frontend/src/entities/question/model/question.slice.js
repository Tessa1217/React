import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionIdx: 2,
  questions: [
    {
      id: 1,
      type: 'multiple_choice',
      questionText: '',
      required: false,
      options: [],
    },
  ],
};

const findQuestionById = (state, id) =>
  state.questions.find((q) => q.id === id);

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    addQuestion: (state, { payload: type }) => {
      state.questions.push({
        id: state.questionIdx,
        type,
        questionText: '',
        required: false,
        options: [],
      });

      state.questionIdx++;
    },
    removeQuestion: (state, { payload: id }) => {
      state.questions = state.questions.filter((q) => q.id !== id);
    },
    changeQuestionText: (state, { payload }) => {
      const { id, questionText } = payload;
      const question = findQuestionById(state, id);
      if (question) {
        question.questionText = questionText;
      }
    },
    changeRequired: (state, { payload }) => {
      const { id, required } = payload;
      const question = findQuestionById(state, id);
      if (question) {
        question.required = required;
      }
    },
    addOption: (state, { payload: id }) => {
      const question = findQuestionById(state, id);
      if (question) {
        const maxOptionId = question.options.length || 0;
        const newOptionId = maxOptionId + 1;
        question.options.push({
          id: newOptionId,
          text: '',
          optionOrder: newOptionId,
        });
      }
    },
    removeOption: (state, { payload }) => {
      const { id, optionId } = payload;
      const question = findQuestionById(state, id);
      if (question) {
        question.options = question.options.filter(
          (opt) => opt.id !== optionId
        );
      }
    },
    changeOption: (state, { payload }) => {
      const { id, optionId, optionText } = payload;
      const question = findQuestionById(state, id);
      if (question) {
        const option = question.options.find((opt) => opt.id === optionId);
        option.optionText = optionText;
      }
    },
  },
});

export const {
  addQuestion,
  removeQuestion,
  changeQuestionText,
  changeRequired,
  addOption,
  removeOption,
  changeOption,
} = questionSlice.actions;
export default questionSlice.reducer;
