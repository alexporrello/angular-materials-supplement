import { ReactiveFormsBuilderModule } from './reactive-forms-builder.module';

import {} from 'jasmine'

describe('ReactiveFormsBuilderModule', () => {
  let reactiveFormsBuilderModule: ReactiveFormsBuilderModule;

  beforeEach(() => {
    reactiveFormsBuilderModule = new ReactiveFormsBuilderModule();
  });

  it('should create an instance', () => {
    expect(reactiveFormsBuilderModule).toBeTruthy();
  });
});
