import { AnimatedModule } from './animated.module';

import {} from 'jasmine'

describe('AnimatedModule', () => {
  let animatedModule: AnimatedModule;

  beforeEach(() => {
    animatedModule = new AnimatedModule();
  });

  it('should create an instance', () => {
    expect(animatedModule).toBeTruthy();
  });
});
