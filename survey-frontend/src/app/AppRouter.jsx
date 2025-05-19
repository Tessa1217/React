<Routes>
  <Route path='/login' element={<LoginPage />} />
  <Route path='/signup' element={<SignupPage />} />
  <Route path='/forms' element={<FormListPage />} />
  <Route path='/forms/new' element={<FormEditorPage />} />
  <Route path='/forms/:id/edit' element={<FormEditorPage />} />
  <Route path='/forms/:id' element={<FormDetailPage />} />
  <Route path='/responses' element={<ResponseListPage />} />
  <Route path='/responses/:formId' element={<ResponseSubmitPage />} />
</Routes>;
