export type RegistrationStatus = "APPROVED" | "REVIEW" | "REPROVED"

export interface Registration {
  id: string,
  email: string,
  employeeName: string
  status: RegistrationStatus
  admissionDate: string
  cpf: string
}

export type RegistrationsData = Registration[]

export interface GetRegistrationsParams {
  cpf?: string
}