import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConfirmationModal from '.';
import '@testing-library/jest-dom';
import { useCloseModal, useModal } from '~/hooks/modal';

jest.mock('~/hooks/modal', () => ({
  useCloseModal: jest.fn(),
  useModal: jest.fn(),
}));

describe('ConfirmationModal', () => {
  const mockCloseModal = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    (useCloseModal as jest.Mock).mockReturnValue(mockCloseModal);
    (useModal as jest.Mock).mockReturnValue({
      title: 'Confirmação',
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
      confirmLabel: 'Sim',
      cancelLabel: 'Não',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal with title and buttons', () => {
    render(<ConfirmationModal />);
    expect(screen.getByText('Confirmação')).toBeInTheDocument();
    expect(screen.getByTestId('ConfirmationModal_Button_cancel')).toHaveTextContent('Não');
    expect(screen.getByTestId('ConfirmationModal_Button_confirm')).toHaveTextContent('Sim');
  });

  it('should call onConfirm and closeModal when confirm button is clicked', async () => {
    render(<ConfirmationModal />);
    fireEvent.click(screen.getByTestId('ConfirmationModal_Button_confirm'));
    expect(mockOnConfirm).toHaveBeenCalled();

    await waitFor(() => expect(mockCloseModal).toHaveBeenCalled(), { timeout: 500 });
  });

  it('should call onCancel and closeModal when cancel button is clicked', async () => {
    render(<ConfirmationModal />);
    fireEvent.click(screen.getByTestId('ConfirmationModal_Button_cancel'));
    expect(mockOnCancel).toHaveBeenCalled();

    await waitFor(() => expect(mockCloseModal).toHaveBeenCalled(), { timeout: 500 });
  });

  it('should not render the modal when modal is null', () => {
    (useModal as jest.Mock).mockReturnValue(null);
    render(<ConfirmationModal />);
    expect(screen.queryByTestId('ConfirmationModal_Card')).not.toBeInTheDocument();
  });
});
