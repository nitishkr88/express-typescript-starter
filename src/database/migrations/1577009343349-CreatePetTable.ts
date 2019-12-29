import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePetTable1577009343349 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: 'pet',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          isGenerated: true
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: false
        },
        {
          name: 'age',
          type: 'int',
          isPrimary: false,
          isNullable: false
        },
        {
          name: 'user_id',
          type: 'uuid',
          isPrimary: false,
          isNullable: true
        }
      ]
    })
    await queryRunner.createTable(table)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('pet')
  }
}
