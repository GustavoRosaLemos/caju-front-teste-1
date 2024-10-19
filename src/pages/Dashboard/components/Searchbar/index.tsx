import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useGetRegistrations } from "~/hooks/registration";
import * as Yup from 'yup';
import { ChangeEvent, KeyboardEvent } from "react";
import { useFormik } from "formik";
import { clearMask, digitMask } from "~/utils/mask";
import { validateCPF } from "~/utils/validate";
export const SearchBar = () => {
  const getRegistrations = useGetRegistrations();
  const history = useHistory();

  const handleFilter = (value: any) => {
    getRegistrations({...value, cpf: clearMask(value.cpf)});
  };

  const {submitForm, handleBlur, setFieldValue, values, errors} = useFormik({
    initialValues: {
      cpf: ''
    },
    onSubmit: handleFilter,
    validationSchema: Yup.object().shape({
      cpf: Yup.string().max(14, 'CPF inválido!').test('valid-cpf', 'CPF inválido!', (value) => {
        if (!value) return true;
        return validateCPF(value);
      })
    })});

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitForm();
    }
  };

  const handleRefresh = () => {
    getRegistrations();
  };

  const handleChanceCpf = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = validateCPF(value);
    setFieldValue('cpf', digitMask(value, '###.###.###-##'));

    setTimeout(() => {
      if (isValid) {
        submitForm();
      }
    }, 120);
  };
  
  return (
    <S.Container>
      <TextField data-testid="Searchbar_texfield_cpf" error={errors.cpf} placeholder="Digite um CPF válido" name="cpf" onKeyDown={handleKeyDown} onChange={handleChanceCpf} onBlur={handleBlur} value={values.cpf} />
      <S.Actions>
        <IconButton data-testid="Searchbar_button_refresh" aria-label="refetch">
          <HiRefresh onClick={handleRefresh} />
        </IconButton>
        <Button data-testid="Searchbar_button_newAdmission" onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
