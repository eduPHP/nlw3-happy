import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterOrphanagesAddStatus1603516265497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orphanages', new TableColumn({
            name: 'status',
            type: 'enum',
            default: "'pending'",
            enum: ['pending', 'active']
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orphanages', 'status')
    }

}
