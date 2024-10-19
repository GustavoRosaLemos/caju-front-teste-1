import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button, { ButtonSmall } from '.';

describe('Button', () => {
  it('should render default variant with default color', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button', { name: /default button/i });
    expect(button).toHaveStyle('background-color: #64a98c');
    expect(button).toHaveStyle('color: white');
  });

  it('should render outlined variant with custom color', () => {
    render(<Button variant="outlined" color="red">Outlined Button</Button>);
    const button = screen.getByRole('button', { name: /outlined button/i });
    expect(button).toHaveStyle('background-color: transparent');
    expect(button).toHaveStyle('color: red');
    expect(button).toHaveStyle('border: 2px solid red');
  });
});

describe('ButtonSmall', () => {
  it('should render with default color and background', () => {
    render(<ButtonSmall>Small Button</ButtonSmall>);
    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toHaveStyle('background-color: ButtonFace');
    expect(button).toHaveStyle('color: #000');
  });

  it('should render with custom bgcolor and color', () => {
    render(<ButtonSmall bgcolor="blue" color="white">Custom Small Button</ButtonSmall>);
    const button = screen.getByRole('button', { name: /custom small button/i });
    expect(button).toHaveStyle('background-color: blue');
    expect(button).toHaveStyle('color: white');
  });
});
