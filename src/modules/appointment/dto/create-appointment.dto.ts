export class CreateAppointmentDto {
  patientMeta_id: number;

  physicianMeta_id: number;

  nurse_id: number;

  start_time: Date;

  end_time: Date;

  is_completed: boolean;

  is_paid: boolean;

  result: string;

  details: string;
}
