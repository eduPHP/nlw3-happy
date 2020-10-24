import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPasswordResets1603512360413 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'password_resets',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'token',
                    type: 'varchar',
                },
                {
                    name: 'used_at',
                    type: 'datetime',
                    isNullable: true
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                },
                {
                    name: 'user_id',
                    type: 'integer',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('password_resets')
    }

}
