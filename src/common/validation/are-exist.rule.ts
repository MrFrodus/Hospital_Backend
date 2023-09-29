import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { DataSource, In } from "typeorm";

@Injectable()
@ValidatorConstraint({ name: "AreExist", async: true })
export class AreExist implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {}

  async validate(values: number[], validationArguments: ValidationArguments) {
    const repository = validationArguments.constraints[0];
    const pathToProperty = validationArguments.constraints[1];

    const entities: unknown[] = await this.dataSource
      .getRepository(repository)
      .find({
        select: {
          [pathToProperty]: true,
        },
        where: { id: In(values) },
      });

    return entities.length === values.length;
  }
}
