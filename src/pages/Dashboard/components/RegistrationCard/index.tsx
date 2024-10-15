import { ButtonSmall } from "~/components/Buttons";
import { Registration } from "~/@types/registration";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { RegistrationStatus } from "~/constants";
import { Else, If, Then } from "react-if";
import { useDeleteRegistration, usePutRegistration } from "~/hooks/registration";
import { toast } from "react-toastify";
import { useToggleModal } from "~/hooks/modal";


type Props = {
  data: Registration;
};

const RegistrationCard = (props: Props) => {
  const putRegistration = usePutRegistration();
  const deleteRegistration = useDeleteRegistration();
  const toggleModal = useToggleModal();

  const handleApprove = async () => {
    toggleModal({title: 'Deseja realmente aprovar o registro?', onConfirm: () => {
      toast.promise(putRegistration({...props.data, status: RegistrationStatus.APPROVED}),{
        pending: 'Aprovando registro...',
        success: 'Status do registro aprovado com sucesso!',
        error: 'Falha ao aprovar status do registro!'
      });
    }});
  };

  const handleReprove = () => {
    toggleModal({title: 'Deseja realmente reprovar o registro?', onConfirm: () => {
      toast.promise(putRegistration({...props.data, status: RegistrationStatus.REPROVED}),{
        pending: 'Reprovando registro...',
        success: 'Status do registro reprovado com sucesso!',
        error: 'Falha ao reprovar status do registro.'
      });
    }});
  };

  const handleReview = () => {
    toggleModal({title: 'Deseja realmente revisar o registro?', onConfirm: () => {
      toast.promise(putRegistration({...props.data, status: RegistrationStatus.REVIEW}),{
        pending: 'Alterando registro...',
        success: 'Status do registro alterado com sucesso!',
        error: 'Falha ao alterar status do registro.'
      });
    }});
  };

  const handleDelete = () => {
    toggleModal({title: 'Deseja realmente excluir o registro?', onConfirm: () => {
      toast.promise(deleteRegistration(props.data.id),{
        pending: 'Excluindo registro...',
        success: 'Registro excluído com sucesso!',
        error: 'Falha excluir registro.'
      });
    }});
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <If condition={props.data.status === RegistrationStatus.REVIEW}>
          <Then>
            <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={handleReprove}>Reprovar</ButtonSmall>
            <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={handleApprove}>Aprovar</ButtonSmall>
          </Then>
          <Else>
            <ButtonSmall bgcolor="#ff8858" onClick={handleReview}>Revisar novamente</ButtonSmall>
          </Else>
        </If>
        <HiOutlineTrash onClick={handleDelete} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
