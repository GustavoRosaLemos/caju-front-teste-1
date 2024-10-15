import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useFormik } from "formik";
import { Registration } from "~/@types/registration";
import { RegistrationStatus } from "~/constants";
import * as Yup from "yup";
import { validateCPF } from "~/utils/validate";
import { FULL_NAME_REGEX } from "~/constants/regex";
import { ChangeEvent } from "react";
import { clearMask, digitMask } from "~/utils/mask";
import { usePostRegistration } from "~/hooks/registration";
import { toast } from "react-toastify";

const NewUserPage = () => {
  const postRegistration = usePostRegistration();
  const history = useHistory();

  const handleSubmit = (values: Omit<Registration, 'id'>) => {
    toast.promise(
      postRegistration({...values, cpf: clearMask(values.cpf)}),
      {
        pending: 'Cadastrando usuário...',
        error: 'Falha ao cadastrar usuário.',
        success: 'Usuário cadastrado com sucesso!'
      }
    );
    history.push(routes.dashboard);
  };


  const { submitForm, handleChange, setFieldValue, values, errors} = useFormik({initialValues: {
    cpf: '',
    employeeName: '',
    status: RegistrationStatus.REVIEW,
    admissionDate: '',
    email: ''
  },
  validationSchema: Yup.object().shape({
    cpf: Yup.string().test('valid-cpf', 'CPF inválido!', (value) => {
      return validateCPF(value ?? '');
    }).required('Obrigatório'),
    employeeName: Yup.string().test((value) => {
      if (!value) return false;
      return FULL_NAME_REGEX.test(value);
    }),
    email: Yup.string().email('Email inválido!').required('Obrigatório')
  }),
  onSubmit: handleSubmit
  });
  
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const handleChanceCpf = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFieldValue('cpf', digitMask(value, '###.###.###-##'));
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField placeholder="Nome" label="Nome" error={errors.employeeName} name="employeeName" value={values.employeeName} onChange={handleChange} />
        <TextField placeholder="Email" label="Email" type="email" error={errors.email} name="email" value={values.email} onChange={handleChange} />
        <TextField placeholder="CPF" label="CPF" error={errors.cpf} name="cpf" value={values.cpf} onChange={handleChanceCpf} />
        <TextField label="Data de admissão" type="date" error={errors.admissionDate} name="admissionDate" value={values.admissionDate} onChange={handleChange} />
        <Button onClick={submitForm}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
