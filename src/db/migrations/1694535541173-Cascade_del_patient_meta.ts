import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeDelPatientMeta1694535541173 implements MigrationInterface {
  name = "CascadeDelPatientMeta1694535541173";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`patient\` DROP FOREIGN KEY \`fk_patient_meta\``
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` ADD CONSTRAINT \`fk_patient_meta\` FOREIGN KEY (\`meta_id\`) REFERENCES \`meta\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`patient\` DROP FOREIGN KEY \`fk_patient_meta\``
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` ADD CONSTRAINT \`fk_patient_meta\` FOREIGN KEY (\`meta_id\`) REFERENCES \`meta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
