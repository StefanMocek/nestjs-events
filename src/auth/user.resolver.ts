import { Query, Resolver } from "@nestjs/graphql";
import { User } from "./entity/user.entity";
import { CurrentUser } from "./decorators/current-user.dacorator";
import { UseGuards } from "@nestjs/common";
import { AuthGuardJwtGql } from "./decorators/auth-guard.jwt.gql";

@Resolver(() => User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    @UseGuards(AuthGuardJwtGql)
    public async me(@CurrentUser() user: User): Promise<User> {
        return user;
    }
}