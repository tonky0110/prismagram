import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		editUser: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { username, email, firstName, lastName, bio, avatar } = args;
			const { user } = request;
			return prisma.updateUser({
				data: { username, email, firstName, lastName, bio, avatar },
				where: { id: user.id }
			});
		}
	}
};
