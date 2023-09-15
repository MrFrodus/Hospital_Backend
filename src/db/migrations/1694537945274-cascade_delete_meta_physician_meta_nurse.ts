import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeDeleteMetaPhysician_metaMetaNurse1694537945274
  implements MigrationInterface
{
  name = "CascadeDeleteMetaPhysician_metaMetaNurse1694537945274";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`nurse\` DROP FOREIGN KEY \`fk_nurse_meta\``
    );
    await queryRunner.query(
      `ALTER TABLE \`physician\` DROP FOREIGN KEY \`fk_physician_meta\``
    );
    await queryRunner.query(
      `ALTER TABLE \`nurse\` ADD CONSTRAINT \`fk_nurse_meta\` FOREIGN KEY (\`meta_id\`) REFERENCES \`meta\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`physician\` ADD CONSTRAINT \`fk_physician_meta\` FOREIGN KEY (\`meta_id\`) REFERENCES \`meta\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`physician\` DROP FOREIGN KEY \`fk_physician_meta\``
    );
    await queryRunner.query(
      `ALTER TABLE \`nurse\` DROP FOREIGN KEY \`fk_nurse_meta\``
    );
    await queryRunner.query(
      `ALTER TABLE \`physician\` ADD CONSTRAINT \`fk_physician_meta\` FOREIGN KEY (\`meta_id\`) REFERENCES \`meta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`nurse\` ADD CONSTRAINT \`fk_nurse_meta\` FOREIGN KEY (\`meta_id\`) REFERENCES \`meta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
