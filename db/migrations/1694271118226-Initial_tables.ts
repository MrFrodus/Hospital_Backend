import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTables1694271118226 implements MigrationInterface {
  name = "InitialTables1694271118226";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`meta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(255) NULL, \`gender\` varchar(50) NULL, \`birth_date\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`address\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`physician\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` int NOT NULL, \`password\` varchar(72) NOT NULL, \`specification\` varchar(100) NULL, \`qualification\` varchar(100) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`meta_id\` int NULL, \`department_id\` int NULL, INDEX \`idx_physician_email\` (\`email\`), INDEX \`idx_physician_phone\` (\`phone\`), INDEX \`idx_physician_department\` (\`department_id\`), UNIQUE INDEX \`unique_physician_email\` (\`email\`), UNIQUE INDEX \`unique_physician_phone\` (\`phone\`), UNIQUE INDEX \`REL_62dd5660baf86e415ecb4c8731\` (\`meta_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`patient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` int NOT NULL, \`password\` varchar(72) NOT NULL, \`ssn\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`meta_id\` int NULL, INDEX \`idx_patient_email\` (\`email\`), INDEX \`idx_patient_phone\` (\`phone\`), UNIQUE INDEX \`unique_patient_email\` (\`email\`), UNIQUE INDEX \`unique_patient_phone\` (\`phone\`), UNIQUE INDEX \`REL_e26e0a170d6a8607e45908b72e\` (\`meta_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`nurse\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` int NOT NULL, \`password\` varchar(72) NOT NULL, \`position\` varchar(100) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`meta_id\` int NULL, \`department_id\` int NULL, INDEX \`idx_nurse_email\` (\`email\`), INDEX \`idx_nurse_phone\` (\`phone\`), INDEX \`idx_nurse_department\` (\`department_id\`), UNIQUE INDEX \`unique_nurse_email\` (\`email\`), UNIQUE INDEX \`unique_nurse_phone\` (\`phone\`), UNIQUE INDEX \`REL_5683f760da5b3ac20af896002f\` (\`meta_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`service\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`description\` varchar(255) NULL, \`cost\` int NOT NULL, \`details\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
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
      `CREATE TABLE \`medication\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`requires_recipe\` tinyint NOT NULL, \`description\` varchar(255) NULL, \`details\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
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
      `ALTER TABLE \`physician\` ADD CONSTRAINT \`fk_physician_meta\` FOREIGN KEY (\`meta_id\`) REFERENCES \`meta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`physician\` ADD CONSTRAINT \`fk_physician_department\` FOREIGN KEY (\`department_id\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` ADD CONSTRAINT \`fk_patient_meta\` FOREIGN KEY (\`meta_id\`) REFERENCES \`meta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`nurse\` ADD CONSTRAINT \`fk_nurse_meta\` FOREIGN KEY (\`meta_id\`) REFERENCES \`meta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`nurse\` ADD CONSTRAINT \`fk_nurse_department\` FOREIGN KEY (\`department_id\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`fk_appointment_patient\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`fk_appointment_physician\` FOREIGN KEY (\`physician_id\`) REFERENCES \`physician\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`fk_appointment_nurse\` FOREIGN KEY (\`nurse_id\`) REFERENCES \`nurse\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnosis\` ADD CONSTRAINT \`fk_diagnosis_physician\` FOREIGN KEY (\`physician_id\`) REFERENCES \`physician\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnosis\` ADD CONSTRAINT \`fk_diagnosis_patient\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnosis\` ADD CONSTRAINT \`fk_diagnosis_appointment\` FOREIGN KEY (\`appointment_id\`) REFERENCES \`appointment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`illness\` ADD CONSTRAINT \`fk_illness_patient\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`illness\` ADD CONSTRAINT \`fk_illness_diagnosis\` FOREIGN KEY (\`diagnosis_id\`) REFERENCES \`diagnosis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`prescription\` ADD CONSTRAINT \`fk_prescription_physician\` FOREIGN KEY (\`physician_id\`) REFERENCES \`physician\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`prescription\` ADD CONSTRAINT \`fk_prescription_patient\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE \`nurse\` DROP FOREIGN KEY \`fk_nurse_department\``
    );
    await queryRunner.query(
      `ALTER TABLE \`nurse\` DROP FOREIGN KEY \`fk_nurse_meta\``
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` DROP FOREIGN KEY \`fk_patient_meta\``
    );
    await queryRunner.query(
      `ALTER TABLE \`physician\` DROP FOREIGN KEY \`fk_physician_department\``
    );
    await queryRunner.query(
      `ALTER TABLE \`physician\` DROP FOREIGN KEY \`fk_physician_meta\``
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
    await queryRunner.query(`DROP TABLE \`medication\``);
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
    await queryRunner.query(`DROP TABLE \`service\``);
    await queryRunner.query(
      `DROP INDEX \`REL_5683f760da5b3ac20af896002f\` ON \`nurse\``
    );
    await queryRunner.query(`DROP INDEX \`unique_nurse_phone\` ON \`nurse\``);
    await queryRunner.query(`DROP INDEX \`unique_nurse_email\` ON \`nurse\``);
    await queryRunner.query(`DROP INDEX \`idx_nurse_department\` ON \`nurse\``);
    await queryRunner.query(`DROP INDEX \`idx_nurse_phone\` ON \`nurse\``);
    await queryRunner.query(`DROP INDEX \`idx_nurse_email\` ON \`nurse\``);
    await queryRunner.query(`DROP TABLE \`nurse\``);
    await queryRunner.query(
      `DROP INDEX \`REL_e26e0a170d6a8607e45908b72e\` ON \`patient\``
    );
    await queryRunner.query(
      `DROP INDEX \`unique_patient_phone\` ON \`patient\``
    );
    await queryRunner.query(
      `DROP INDEX \`unique_patient_email\` ON \`patient\``
    );
    await queryRunner.query(`DROP INDEX \`idx_patient_phone\` ON \`patient\``);
    await queryRunner.query(`DROP INDEX \`idx_patient_email\` ON \`patient\``);
    await queryRunner.query(`DROP TABLE \`patient\``);
    await queryRunner.query(
      `DROP INDEX \`REL_62dd5660baf86e415ecb4c8731\` ON \`physician\``
    );
    await queryRunner.query(
      `DROP INDEX \`unique_physician_phone\` ON \`physician\``
    );
    await queryRunner.query(
      `DROP INDEX \`unique_physician_email\` ON \`physician\``
    );
    await queryRunner.query(
      `DROP INDEX \`idx_physician_department\` ON \`physician\``
    );
    await queryRunner.query(
      `DROP INDEX \`idx_physician_phone\` ON \`physician\``
    );
    await queryRunner.query(
      `DROP INDEX \`idx_physician_email\` ON \`physician\``
    );
    await queryRunner.query(`DROP TABLE \`physician\``);
    await queryRunner.query(`DROP TABLE \`department\``);
    await queryRunner.query(`DROP TABLE \`meta\``);
  }
}
