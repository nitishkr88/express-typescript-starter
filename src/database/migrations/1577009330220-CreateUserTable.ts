import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUserTable1577009330220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          isGenerated: true
        },
        {
          name: 'first_name',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: false
        },
        {
          name: 'last_name',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: false
        },
        {
          name: 'email',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: false
        },
        {
          name: 'username',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: false
        },
        {
          name: 'password',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: false
        }
      ]
    })
    await queryRunner.createTable(table)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user')
  }
}
