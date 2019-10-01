import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		editUser: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { username, email, firstName, lastName, bio } = args;
			const { user } = request;
			return prisma.updateUser({
				data: { username, email, firstName, lastName, bio },
				where: { id: user.id }
			});
		}
	}
};
