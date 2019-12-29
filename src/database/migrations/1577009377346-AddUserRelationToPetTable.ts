import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class AddUserRelationToPetTable1577009377346
  implements MigrationInterface {
  private tableForeignKey = new TableForeignKey({
    name: 'fk_user_pet',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'user',
    onDelete: 'CASCADE'
  })

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey('pet', this.tableForeignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('pet', this.tableForeignKey)
  }
}
