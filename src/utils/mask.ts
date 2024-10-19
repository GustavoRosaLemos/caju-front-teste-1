export const digitMask = (value: string, mask: string): string => {
  const clearValue = value.replace(/\D/g, '');
  let maskedValue = '';
  let index = 0;

  for (let i = 0; i < mask.length && index < clearValue.length; i++) {
    if (mask[i] === '#') {
      maskedValue += clearValue[index];
      index++;
    } else {
      maskedValue += mask[i]; 
    }
  }

  return maskedValue;
};

export const clearMask = (value: string) => value.replace(/\D/g, '');
