import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from './index';

describe('TextField', () => {
  it('should render the label correctly', () => {
    render(<TextField label="Nome" id="name" />);

    const label = screen.getByLabelText('Nome');
    expect(label).toBeInTheDocument();
  });

  it('should render an error message when error prop is passed', () => {
    render(<TextField label="Nome" id="name" error="Campo obrigatório" />);

    const errorMessage = screen.getByText('Campo obrigatório');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyle({ color: 'red', fontSize: '12px' });
  });

  it('should call onChange when input value is changed', () => {
    const handleChange = jest.fn();
    render(<TextField label="Nome" id="name" onChange={handleChange} />);

    const input = screen.getByLabelText('Nome');
    fireEvent.change(input, { target: { value: 'João' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('João');
  });

  it('should render with default styles', () => {
    render(<TextField label="Nome" id="name" />);

    const input = screen.getByLabelText('Nome');

    expect(input).toHaveStyle(`
      padding: 0 8px;
      border-radius: 8px;
      background-color: #ffffff;
      border: 1px solid rgba(36, 28, 21, 0.3);
      font-size: 16px;
      min-height: 36px;
    `);
  });
});
