import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from "../src/prisma/prisma.service";
import { AuthDto } from "../src/auth/dto";
import * as pactum from 'pactum';

describe('App e2e', () => {
  let app: INestApplication
  let primsa: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile()
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
    primsa = app.get(PrismaService);
    await primsa.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3000')
  });
  it.todo('should pass')

  afterAll(() => {
    app.close()
  })
  it.todo('should pass')

  describe('auth', () => {

    describe('signup', () => {
      it('Should Signup', () => {
        const dto: AuthDto = {
          email: "aaa@b.com",
          password: "salman"
        }
        return pactum.spec().post('/auth/signup').withBody(dto).inspect().expectStatus(201)
      })
    })
    it('signin', () => {
      const dto: AuthDto = {
        email: "aaa@b.com",
        password: "salman"
      }
      return pactum.spec().post('/auth/signin').withBody(dto).inspect().expectStatus(200).stores('userAt', 'access_token')
    })
  })
  it('user', () => {

    return pactum.spec().get('/users/me').withHeaders({ Authorization: 'Bearer $S{userAt}' }).inspect().expectStatus(200)
  })
})





