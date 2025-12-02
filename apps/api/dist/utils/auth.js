import { createRemoteJWKSet, jwtVerify } from "jose";
let jwks = null;
function ensureAuthEnv() {
    if (!process.env.AUTH0_ISSUER_BASE_URL) {
        throw new Error("AUTH0_ISSUER_BASE_URL is not configured");
    }
    if (!process.env.AUTH0_AUDIENCE) {
        throw new Error("AUTH0_AUDIENCE is not configured");
    }
}
async function getJwks() {
    ensureAuthEnv();
    if (!jwks) {
        jwks = createRemoteJWKSet(new URL(`${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`));
    }
    return jwks;
}
export async function requireAuth(request, reply) {
    const header = request.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        reply.code(401);
        throw new Error("Missing bearer token");
    }
    const token = header.slice(7);
    try {
        const { payload } = await jwtVerify(token, await getJwks(), {
            issuer: process.env.AUTH0_ISSUER_BASE_URL,
            audience: process.env.AUTH0_AUDIENCE,
        });
        return payload;
    }
    catch (error) {
        reply.code(401);
        throw error;
    }
}
