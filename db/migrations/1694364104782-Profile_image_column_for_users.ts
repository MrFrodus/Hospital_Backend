import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfileImageColumnForUsers1694364104782
  implements MigrationInterface
{
  name = "ProfileImageColumnForUsers1694364104782";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`physician\` ADD \`profile_img\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`physician\` ADD \`img_caption\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` ADD \`profile_img\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` ADD \`img_caption\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`nurse\` ADD \`profile_img\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`nurse\` ADD \`img_caption\` varchar(255) NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`nurse\` DROP COLUMN \`img_caption\``
    );
    await queryRunner.query(
      `ALTER TABLE \`nurse\` DROP COLUMN \`profile_img\``
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` DROP COLUMN \`img_caption\``
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` DROP COLUMN \`profile_img\``
    );
    await queryRunner.query(
      `ALTER TABLE \`physician\` DROP COLUMN \`img_caption\``
    );
    await queryRunner.query(
      `ALTER TABLE \`physician\` DROP COLUMN \`profile_img\``
    );
  }
}
