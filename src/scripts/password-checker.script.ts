import {PrismaClient} from '@prisma/client';
import * as http from 'tiny-json-http';

const prisma = new PrismaClient();
const PASSWORD_VALIDITY_CHECKER_API: string
  = process.env.PASSWORD_VALIDITY_CHECKER_API;
const PASSWORD_COMPROMISED_CHECKER_API: string
  = process.env.PASSWORD_COMPROMISED_CHECKER_API;

export const run = async function run() {
  const passwords = await prisma.passwords.findMany();
  for (const password of passwords) {
    isValid(password.password);
    isCompromised(password.password);
  }
};

const isValid = password => {
  http.post(
    {url: PASSWORD_VALIDITY_CHECKER_API, data: {password}},
    async (error, result) => {
      if (error?.body?.errors) {
        console.log(
          `Validaty check: 😡 Password ${password} Is Really Bad Because: [${error.body.errors.join(
            ',',
          )}], Setting it in DB as Not valid..`,
        );
        updatePassword(password, 0);
      } else {
        console.log(
          `Validaty check: 🥳 Password ${password} Is Good, Setting it in DB as valid..`,
        );
        updatePassword(password, 1);
      }
    },
  );
};

const isCompromised = password => {
  http.get(
    {
      url: `${PASSWORD_COMPROMISED_CHECKER_API}?password=${encodeURIComponent(
        password,
      )}`,
    },
    (error, result) => {
      if (result?.body == '') {
        console.log(`🔒 Password: ${password} is not compromised`);
      } else if (result?.body?.message) {
        console.log(`😱 Password: ${password} is compromised`);
      } else {
        console.log(`❌ Something wrong checking ${password}`);
      }
    },
  );
};

const updatePassword = async (password: string, isValid: number) =>
  prisma.passwords.update({
    where: {
      password,
    },
    data: {
      valid: isValid,
    },
  });
