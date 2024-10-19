import { digitMask, clearMask } from './mask';

describe('digitMask', () => {
  it('should apply the mask correctly', () => {
    const result = digitMask('12345678989', '###.###.###-##');
    expect(result).toBe('123.456.789-89');
  });

  it('should handle cases where value has less digits than the mask', () => {
    const result = digitMask('12345', '###.###.###-##');
    expect(result).toBe('123.45');
  });

  it('should handle cases where value has more digits than the mask', () => {
    const result = digitMask('123456789012345', '###.###.###-##');
    expect(result).toBe('123.456.789-01');
  });

  it('should return an empty string when value is empty', () => {
    const result = digitMask('', '###.###.###-##');
    expect(result).toBe('');
  });

  it('should ignore non-numeric characters in value', () => {
    const result = digitMask('abc123def456', '###.###');
    expect(result).toBe('123.456');
  });
});

describe('clearMask', () => {
  it('should remove all non-numeric characters', () => {
    const result = clearMask('123.456.789-01');
    expect(result).toBe('12345678901');
  });

  it('should return an empty string when input is empty', () => {
    const result = clearMask('');
    expect(result).toBe('');
  });

  it('should handle strings without non-numeric characters', () => {
    const result = clearMask('1234567890');
    expect(result).toBe('1234567890');
  });

  it('should remove special characters and letters', () => {
    const result = clearMask('abc-123-xyz');
    expect(result).toBe('123');
  });
});
