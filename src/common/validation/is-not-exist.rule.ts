import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { DataSource } from "typeorm";

@Injectable()
@ValidatorConstraint({ name: "IsNotExist", async: true })
export class IsNotExist implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {}

  async validate(value: string, validationArguments: ValidationArguments) {
    const repository = validationArguments.constraints[0];
    const pathToProperty = validationArguments.constraints[1];

    const entity: unknown = await this.dataSource
      .getRepository(repository)
      .findOne({
        select: {
          [pathToProperty]: true,
        },
        where: {
          [pathToProperty]: value,
        },
      });

    return Boolean(!entity);
  }
}
