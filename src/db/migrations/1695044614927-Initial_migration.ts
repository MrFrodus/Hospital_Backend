import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695044614927 implements MigrationInterface {
  name = "InitialMigration1695044614927";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`medication\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`requires_recipe\` tinyint NOT NULL, \`description\` varchar(255) NULL, \`details\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`service\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`description\` varchar(255) NULL, \`cost\` int NOT NULL, \`details\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`address\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`nurse_meta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`position\` varchar(100) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`department_id\` int NULL, INDEX \`idx_nurse_department\` (\`department_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`patient_meta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ssn\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`physician_meta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`specification\` varchar(100) NULL, \`qualification\` varchar(100) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`department_id\` int NULL, INDEX \`idx_physicianMeta_department\` (\`department_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` int NOT NULL, \`password\` varchar(72) NOT NULL, \`address\` varchar(255) NULL, \`gender\` varchar(50) NOT NULL, \`birth_date\` datetime NOT NULL, \`role\` enum ('patient', 'physician', 'nurse') NOT NULL, \`profile_img\` varchar(255) NULL, \`img_caption\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`patientMeta_id\` int NULL, \`physicianMeta_id\` int NULL, \`nurseMeta_id\` int NULL, INDEX \`idx_user_email\` (\`email\`), INDEX \`idx_user_phone\` (\`phone\`), UNIQUE INDEX \`unique_user_email\` (\`email\`), UNIQUE INDEX \`unique_user_phone\` (\`phone\`), UNIQUE INDEX \`REL_a9d4105f83764f961ddcba2fad\` (\`patientMeta_id\`), UNIQUE INDEX \`REL_3d46d2d9228b8879e20f306de0\` (\`physicianMeta_id\`), UNIQUE INDEX \`REL_c8c4d5996e44e5952346b2b60c\` (\`nurseMeta_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`appointment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`starts_at\` datetime NOT NULL, \`ends_at\` datetime NULL, \`is_completed\` tinyint NOT NULL, \`is_paid\` tinyint NOT NULL, \`result\` varchar(255) NOT NULL, \`details\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`patient_id\` int NULL, \`physician_id\` int NULL, \`nurse_id\` int NULL, INDEX \`idx_appointment_patient\` (\`patient_id\`), INDEX \`idx_appointment_physician\` (\`physician_id\`), INDEX \`idx_appointment_nurse\` (\`nurse_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`diagnosis\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`details\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`physician_id\` int NULL, \`patient_id\` int NULL, \`appointment_id\` int NULL, INDEX \`idx_diagnosis_physician\` (\`physician_id\`), INDEX \`idx_diagnosis_patient\` (\`patient_id\`), UNIQUE INDEX \`REL_1d5530e95f3836ada99cf67989\` (\`appointment_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`illness\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`description\` varchar(255) NULL, \`details\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`patient_id\` int NULL, \`diagnosis_id\` int NULL, INDEX \`idx_illness_patient\` (\`patient_id\`), INDEX \`idx_illness_diagnosis\` (\`diagnosis_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`prescription\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`physician_id\` int NULL, \`patient_id\` int NULL, INDEX \`idx_prescription_physician\` (\`physician_id\`), INDEX \`idx_prescription_patient\` (\`patient_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`appointment_service\` (\`appointmentId\` int NOT NULL, \`serviceId\` int NOT NULL, INDEX \`IDX_040c82b23e660475d29615eaac\` (\`appointmentId\`), INDEX \`IDX_1963f7aba7148362308fd7a563\` (\`serviceId\`), PRIMARY KEY (\`appointmentId\`, \`serviceId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`prescription_medication\` (\`prescriptionId\` int NOT NULL, \`medicationId\` int NOT NULL, INDEX \`IDX_3cd4cc3914a0ddd9c089fc3332\` (\`prescriptionId\`), INDEX \`IDX_f523ecc6802d1e3e01115ede23\` (\`medicationId\`), PRIMARY KEY (\`prescriptionId\`, \`medicationId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`nurse_meta\` ADD CONSTRAINT \`fk_nurse_department\` FOREIGN KEY (\`department_id\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`physician_meta\` ADD CONSTRAINT \`fk_physicianMeta_department\` FOREIGN KEY (\`department_id\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`fk_user_patientMeta\` FOREIGN KEY (\`patientMeta_id\`) REFERENCES \`patient_meta\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`fk_user_physicianMeta\` FOREIGN KEY (\`physicianMeta_id\`) REFERENCES \`physician_meta\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`fk_user_nurseMeta\` FOREIGN KEY (\`nurseMeta_id\`) REFERENCES \`nurse_meta\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`fk_appointment_patient\` FOREIGN KEY (\`patient_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`fk_appointment_physician\` FOREIGN KEY (\`physician_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`fk_appointment_nurse\` FOREIGN KEY (\`nurse_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnosis\` ADD CONSTRAINT \`fk_diagnosis_physician\` FOREIGN KEY (\`physician_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnosis\` ADD CONSTRAINT \`fk_diagnosis_patient\` FOREIGN KEY (\`patient_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnosis\` ADD CONSTRAINT \`fk_diagnosis_appointment\` FOREIGN KEY (\`appointment_id\`) REFERENCES \`appointment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`illness\` ADD CONSTRAINT \`fk_illness_patient\` FOREIGN KEY (\`patient_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`illness\` ADD CONSTRAINT \`fk_illness_diagnosis\` FOREIGN KEY (\`diagnosis_id\`) REFERENCES \`diagnosis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`prescription\` ADD CONSTRAINT \`fk_prescription_physician\` FOREIGN KEY (\`physician_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`prescription\` ADD CONSTRAINT \`fk_prescription_patient\` FOREIGN KEY (\`patient_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment_service\` ADD CONSTRAINT \`FK_040c82b23e660475d29615eaac5\` FOREIGN KEY (\`appointmentId\`) REFERENCES \`appointment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment_service\` ADD CONSTRAINT \`FK_1963f7aba7148362308fd7a5637\` FOREIGN KEY (\`serviceId\`) REFERENCES \`service\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`prescription_medication\` ADD CONSTRAINT \`FK_3cd4cc3914a0ddd9c089fc33325\` FOREIGN KEY (\`prescriptionId\`) REFERENCES \`prescription\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`prescription_medication\` ADD CONSTRAINT \`FK_f523ecc6802d1e3e01115ede234\` FOREIGN KEY (\`medicationId\`) REFERENCES \`medication\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`prescription_medication\` DROP FOREIGN KEY \`FK_f523ecc6802d1e3e01115ede234\``
    );
    await queryRunner.query(
      `ALTER TABLE \`prescription_medication\` DROP FOREIGN KEY \`FK_3cd4cc3914a0ddd9c089fc33325\``
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment_service\` DROP FOREIGN KEY \`FK_1963f7aba7148362308fd7a5637\``
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment_service\` DROP FOREIGN KEY \`FK_040c82b23e660475d29615eaac5\``
    );
    await queryRunner.query(
      `ALTER TABLE \`prescription\` DROP FOREIGN KEY \`fk_prescription_patient\``
    );
    await queryRunner.query(
      `ALTER TABLE \`prescription\` DROP FOREIGN KEY \`fk_prescription_physician\``
    );
    await queryRunner.query(
      `ALTER TABLE \`illness\` DROP FOREIGN KEY \`fk_illness_diagnosis\``
    );
    await queryRunner.query(
      `ALTER TABLE \`illness\` DROP FOREIGN KEY \`fk_illness_patient\``
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnosis\` DROP FOREIGN KEY \`fk_diagnosis_appointment\``
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnosis\` DROP FOREIGN KEY \`fk_diagnosis_patient\``
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnosis\` DROP FOREIGN KEY \`fk_diagnosis_physician\``
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`fk_appointment_nurse\``
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`fk_appointment_physician\``
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`fk_appointment_patient\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`fk_user_nurseMeta\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`fk_user_physicianMeta\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`fk_user_patientMeta\``
    );
    await queryRunner.query(
      `ALTER TABLE \`physician_meta\` DROP FOREIGN KEY \`fk_physicianMeta_department\``
    );
    await queryRunner.query(
      `ALTER TABLE \`nurse_meta\` DROP FOREIGN KEY \`fk_nurse_department\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f523ecc6802d1e3e01115ede23\` ON \`prescription_medication\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3cd4cc3914a0ddd9c089fc3332\` ON \`prescription_medication\``
    );
    await queryRunner.query(`DROP TABLE \`prescription_medication\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_1963f7aba7148362308fd7a563\` ON \`appointment_service\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_040c82b23e660475d29615eaac\` ON \`appointment_service\``
    );
    await queryRunner.query(`DROP TABLE \`appointment_service\``);
    await queryRunner.query(
      `DROP INDEX \`idx_prescription_patient\` ON \`prescription\``
    );
    await queryRunner.query(
      `DROP INDEX \`idx_prescription_physician\` ON \`prescription\``
    );
    await queryRunner.query(`DROP TABLE \`prescription\``);
    await queryRunner.query(
      `DROP INDEX \`idx_illness_diagnosis\` ON \`illness\``
    );
    await queryRunner.query(
      `DROP INDEX \`idx_illness_patient\` ON \`illness\``
    );
    await queryRunner.query(`DROP TABLE \`illness\``);
    await queryRunner.query(
      `DROP INDEX \`REL_1d5530e95f3836ada99cf67989\` ON \`diagnosis\``
    );
    await queryRunner.query(
      `DROP INDEX \`idx_diagnosis_patient\` ON \`diagnosis\``
    );
    await queryRunner.query(
      `DROP INDEX \`idx_diagnosis_physician\` ON \`diagnosis\``
    );
    await queryRunner.query(`DROP TABLE \`diagnosis\``);
    await queryRunner.query(
      `DROP INDEX \`idx_appointment_nurse\` ON \`appointment\``
    );
    await queryRunner.query(
      `DROP INDEX \`idx_appointment_physician\` ON \`appointment\``
    );
    await queryRunner.query(
      `DROP INDEX \`idx_appointment_patient\` ON \`appointment\``
    );
    await queryRunner.query(`DROP TABLE \`appointment\``);
    await queryRunner.query(
      `DROP INDEX \`REL_c8c4d5996e44e5952346b2b60c\` ON \`user\``
    );
    await queryRunner.query(
      `DROP INDEX \`REL_3d46d2d9228b8879e20f306de0\` ON \`user\``
    );
    await queryRunner.query(
      `DROP INDEX \`REL_a9d4105f83764f961ddcba2fad\` ON \`user\``
    );
    await queryRunner.query(`DROP INDEX \`unique_user_phone\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`unique_user_email\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`idx_user_phone\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`idx_user_email\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`idx_physicianMeta_department\` ON \`physician_meta\``
    );
    await queryRunner.query(`DROP TABLE \`physician_meta\``);
    await queryRunner.query(`DROP TABLE \`patient_meta\``);
    await queryRunner.query(
      `DROP INDEX \`idx_nurse_department\` ON \`nurse_meta\``
    );
    await queryRunner.query(`DROP TABLE \`nurse_meta\``);
    await queryRunner.query(`DROP TABLE \`department\``);
    await queryRunner.query(`DROP TABLE \`service\``);
    await queryRunner.query(`DROP TABLE \`medication\``);
  }
}
