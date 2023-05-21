import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { ErrorHandler, sendToken, validator } from "../utils";
import { Repository } from "typeorm";
import appDataSource from "../typeorm.config";
import * as bcrypt from "bcryptjs";

export class UserController {
  private userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  public async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder("user")
      .where("user.username=:username", { username })
      .getOne();
  }

  public static async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email, username, password, name } = req.body as User;

    // Data Validations

    const erroValidation = validator({ email, username, password, name });

    if (erroValidation.length) {
      return next(new ErrorHandler(erroValidation, 404));
    }
    const userController = new UserController(
      appDataSource.getRepository(User)
    );

    // Checking IF User exists

    const isUserExist = await userController.findByUsername(username);

    if (isUserExist) {
      return next(new ErrorHandler("User already exists", 404));
    }

    // Creating New Users
    const user = new User();

    const salt = bcrypt.genSaltSync(10);

    user.username = username;
    user.password = await bcrypt.hash(password, salt);
    user.name = name;
    user.email = email;

    await userController.userRepository.save(user);

    sendToken(res, user, 201);
  }
}
