import { MigrationInterface, QueryRunner } from "typeorm";

export class MetaTable1694245110277 implements MigrationInterface {
  name = "MetaTable1694245110277";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`meta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(255) NULL, \`gender\` varchar(50) NULL, \`birth_date\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`meta\``);
  }
}
