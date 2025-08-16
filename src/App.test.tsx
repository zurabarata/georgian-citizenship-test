import React from 'react';
import {render} from '@testing-library/react';
import {App} from './App';
import {describe, it, expect} from 'vitest';

// Simple test to check if app renders
describe('App', () => {
  it('renders without crashing', () => {
    const {baseElement} = render(<App/>);
    expect(baseElement).toBeDefined();
  });
});
