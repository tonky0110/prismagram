import './env';
import { GraphQLServer } from 'graphql-yoga';
import { prisma } from '../generated/prisma-client';
import logger from 'morgan';
import passport from 'passport';
import schema from './schema';
import { authenticateJwt } from './passport';

const PORT = process.env.PORT;
const server = new GraphQLServer({ schema, context: ({ request }) => ({ request }) });

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => console.log(`✅ Server is running on localhost://${PORT}`));
