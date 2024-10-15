import { cpf as validator } from 'cpf-cnpj-validator';
import { clearMask } from './mask';

export const validateCPF = (cpf: string) => 
  validator.isValid(clearMask(cpf));