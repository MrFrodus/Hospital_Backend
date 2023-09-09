import { MigrationInterface, QueryRunner } from "typeorm";

export class PatientTbDepartmentTb1694253149232 implements MigrationInterface {
  name = "PatientTbDepartmentTb1694253149232";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`address\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`patient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` int NOT NULL, \`password\` varchar(72) NOT NULL, \`ssn\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`metaId\` int NULL, INDEX \`idx_patient_email\` (\`email\`), INDEX \`idx_patient_phone\` (\`phone\`), UNIQUE INDEX \`unique_patient_email\` (\`email\`), UNIQUE INDEX \`unique_patient_phone\` (\`phone\`), UNIQUE INDEX \`unique_patient_meta_id\` (\`metaId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` ADD CONSTRAINT \`fk_patient_meta\` FOREIGN KEY (\`metaId\`) REFERENCES \`meta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`patient\` DROP FOREIGN KEY \`fk_patient_meta\``
    );
    await queryRunner.query(
      `DROP INDEX \`unique_patient_meta_id\` ON \`patient\``
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
    await queryRunner.query(`DROP TABLE \`department\``);
  }
}
