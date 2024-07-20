"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1719148227942 = void 0;
class CreateUserTable1719148227942 {
    constructor() {
        this.name = 'CreateUserTable1719148227942';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "dateOfBirth" date, "phoneNumber" character varying(15), "address" character varying(255), "city" character varying(255), "state" character varying(255), "country" character varying(255), "zipCode" character varying(255), "isEmailVerified" boolean NOT NULL DEFAULT false, "isPhoneVerified" boolean NOT NULL DEFAULT false, "isTwoFactorEnabled" boolean NOT NULL DEFAULT false, "twoFactorSecret" character varying, "profileImage" character varying, "resetPasswordToken" character varying, "resetPasswordExpires" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.CreateUserTable1719148227942 = CreateUserTable1719148227942;
//# sourceMappingURL=1719148227942-CreateUserTable.js.map