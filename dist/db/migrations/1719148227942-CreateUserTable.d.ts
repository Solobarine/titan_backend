import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateUserTable1719148227942 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
