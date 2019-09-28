import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
	Mutation: {
		confirmSecret: async (_, args, { request }) => {
			const { email, secret } = args;
			const user = await prisma.user({ email });
			if (user) {
				if (user.loginSecret === secret) {
					const token = generateToken(user.id);
					console.log('token: ', token);
					return token;
				} else {
					throw Error('Wrong email/secret combination');
				}
			}
			throw Error('Wrong email');
		}
	}
};
