import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingText } from './index';

describe('LoadingText', () => {
  it('should render the text with each letter in a span', () => {
    const text = 'Carregando';
    render(<LoadingText text={text} />);
    
    const letters = text.split('');
    
    letters.forEach((letter) => {
      const letterElements = screen.getAllByText(letter);
      expect(letterElements.length).toBeGreaterThan(0);
    });
  });

  it('should apply the correct animation delay for each letter', () => {
    const text = 'Test';
    render(<LoadingText text={text} />);

    const letters = screen.getAllByText(/./); 
    letters.forEach((letter, index) => {
      expect(letter).toHaveStyle(`animation-delay: ${index - 2}s`);
    });
  });

  it('should apply the correct styles for each letter', () => {
    render(<LoadingText text="T" />);

    const letter = screen.getByText('T');

    expect(letter).toHaveStyle(`
      display: inline-block;
      animation: disintegrateText 10s ease-in-out infinite;
    `);
    expect(letter).toHaveStyle(`background: linear-gradient(258deg, rgba(255, 117, 0, 1) 8%, rgba(232, 5, 55, 1) 53%)`);
    expect(letter).toHaveStyle(`background-clip: text`);
  });

  it('should apply the correct styles for the Loading container', () => {
    render(<LoadingText text="Loading" />);

    const loadingContainer = screen.getByText('L').parentElement;

    expect(loadingContainer).toHaveStyle(`
      z-index: 2;
      font-size: 120px;
      font-weight: bold;
      display: inline-flex;
      position: fixed;
    `);
  });
});
