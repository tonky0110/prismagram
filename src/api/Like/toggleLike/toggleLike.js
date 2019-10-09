import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		toggleLike: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { user } = request;
			const { postId } = args;
			const filterOptions = { AND: [ { user: { id: user.id } }, { post: { id: postId } } ] };
			console.log('1) filterOptions: ', filterOptions);
			try {
				const existingLike = await prisma.$exists.like(filterOptions);
				console.log('2) check existingLike: ', existingLike);
				if (existingLike) {
					const like = await prisma.deleteManyLikes(filterOptions);
					console.log('3) like: ', like);
				} else {
					await prisma.createLike({
						user: {
							connect: {
								id: user.id
							}
						},
						post: {
							connect: {
								id: postId
							}
						}
					});
				}
				return true;
			} catch (error) {
				console.log('4) exception catch: ', error);
				return false;
			}
		}
	}
};
