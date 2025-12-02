module.exports = {

"[project]/apps/web/.next-internal/server/app/api/user/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo-experimental.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo-experimental.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo-experimental.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo-experimental.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo-experimental.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo-experimental.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo-experimental.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo-experimental.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/apps/web/lib/auth/session.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "comparePasswords": (()=>comparePasswords),
    "getSession": (()=>getSession),
    "hashPassword": (()=>hashPassword),
    "setSession": (()=>setSession),
    "signToken": (()=>signToken),
    "verifyToken": (()=>verifyToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.3/node_modules/jose/dist/webapi/jwt/sign.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.3/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$0$2d$canary$2e$47_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.0-canary.47_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
const key = new TextEncoder().encode(process.env.AUTH_SECRET);
const SALT_ROUNDS = 10;
async function hashPassword(password) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hash"])(password, SALT_ROUNDS);
}
async function comparePasswords(plainTextPassword, hashedPassword) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["compare"])(plainTextPassword, hashedPassword);
}
async function signToken(payload) {
    return await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignJWT"](payload).setProtectedHeader({
        alg: 'HS256'
    }).setIssuedAt().setExpirationTime('1 day from now').sign(key);
}
async function verifyToken(input) {
    const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(input, key, {
        algorithms: [
            'HS256'
        ]
    });
    return payload;
}
async function getSession() {
    const session = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$0$2d$canary$2e$47_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).get('session')?.value;
    if (!session) return null;
    return await verifyToken(session);
}
async function setSession(user) {
    const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = {
        user: {
            id: user.id
        },
        expires: expiresInOneDay.toISOString()
    };
    const encryptedSession = await signToken(session);
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$0$2d$canary$2e$47_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).set('session', encryptedSession, {
        expires: expiresInOneDay,
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    });
}
}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/net [external] (net, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}}),
"[externals]/tls [external] (tls, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/perf_hooks [external] (perf_hooks, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("perf_hooks", () => require("perf_hooks"));

module.exports = mod;
}}),
"[project]/apps/web/lib/db/schema/users.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ActivityType": (()=>ActivityType),
    "activityLogs": (()=>activityLogs),
    "activityLogsRelations": (()=>activityLogsRelations),
    "invitations": (()=>invitations),
    "invitationsRelations": (()=>invitationsRelations),
    "teamMembers": (()=>teamMembers),
    "teamMembersRelations": (()=>teamMembersRelations),
    "teams": (()=>teams),
    "teamsRelations": (()=>teamsRelations),
    "users": (()=>users),
    "usersRelations": (()=>usersRelations)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/table.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/serial.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/varchar.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/text.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/integer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/relations.js [app-route] (ecmascript)");
;
;
const users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])('users', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])('id').primaryKey(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])('name', {
        length: 100
    }),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])('email', {
        length: 255
    }).notNull().unique(),
    passwordHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('password_hash').notNull(),
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])('role', {
        length: 20
    }).notNull().default('member'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('created_at').notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('updated_at').notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('deleted_at')
});
const teams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])('teams', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])('id').primaryKey(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])('name', {
        length: 100
    }).notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('created_at').notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('updated_at').notNull().defaultNow(),
    stripeCustomerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('stripe_customer_id').unique(),
    stripeSubscriptionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('stripe_subscription_id').unique(),
    stripeProductId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('stripe_product_id'),
    planName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])('plan_name', {
        length: 50
    }),
    subscriptionStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])('subscription_status', {
        length: 20
    })
});
const teamMembers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])('team_members', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])('id').primaryKey(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])('user_id').notNull().references(()=>users.id),
    teamId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])('team_id').notNull().references(()=>teams.id),
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])('role', {
        length: 50
    }).notNull(),
    joinedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('joined_at').notNull().defaultNow()
});
const activityLogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])('activity_logs', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])('id').primaryKey(),
    teamId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])('team_id').notNull().references(()=>teams.id),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])('user_id').references(()=>users.id),
    action: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('action').notNull(),
    timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('timestamp').notNull().defaultNow(),
    ipAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])('ip_address', {
        length: 45
    })
});
const invitations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])('invitations', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])('id').primaryKey(),
    teamId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])('team_id').notNull().references(()=>teams.id),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])('email', {
        length: 255
    }).notNull(),
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])('role', {
        length: 50
    }).notNull(),
    invitedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])('invited_by').notNull().references(()=>users.id),
    invitedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('invited_at').notNull().defaultNow(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])('status', {
        length: 20
    }).notNull().default('pending')
});
const teamsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(teams, ({ many })=>({
        teamMembers: many(teamMembers),
        activityLogs: many(activityLogs),
        invitations: many(invitations)
    }));
const usersRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(users, ({ many })=>({
        teamMembers: many(teamMembers),
        invitationsSent: many(invitations)
    }));
const invitationsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(invitations, ({ one })=>({
        team: one(teams, {
            fields: [
                invitations.teamId
            ],
            references: [
                teams.id
            ]
        }),
        invitedBy: one(users, {
            fields: [
                invitations.invitedBy
            ],
            references: [
                users.id
            ]
        })
    }));
const teamMembersRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(teamMembers, ({ one })=>({
        user: one(users, {
            fields: [
                teamMembers.userId
            ],
            references: [
                users.id
            ]
        }),
        team: one(teams, {
            fields: [
                teamMembers.teamId
            ],
            references: [
                teams.id
            ]
        })
    }));
const activityLogsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(activityLogs, ({ one })=>({
        team: one(teams, {
            fields: [
                activityLogs.teamId
            ],
            references: [
                teams.id
            ]
        }),
        user: one(users, {
            fields: [
                activityLogs.userId
            ],
            references: [
                users.id
            ]
        })
    }));
var ActivityType = /*#__PURE__*/ function(ActivityType) {
    ActivityType["SIGN_UP"] = "SIGN_UP";
    ActivityType["SIGN_IN"] = "SIGN_IN";
    ActivityType["SIGN_OUT"] = "SIGN_OUT";
    ActivityType["UPDATE_PASSWORD"] = "UPDATE_PASSWORD";
    ActivityType["DELETE_ACCOUNT"] = "DELETE_ACCOUNT";
    ActivityType["UPDATE_ACCOUNT"] = "UPDATE_ACCOUNT";
    ActivityType["CREATE_TEAM"] = "CREATE_TEAM";
    ActivityType["REMOVE_TEAM_MEMBER"] = "REMOVE_TEAM_MEMBER";
    ActivityType["INVITE_TEAM_MEMBER"] = "INVITE_TEAM_MEMBER";
    ActivityType["ACCEPT_INVITATION"] = "ACCEPT_INVITATION";
    return ActivityType;
}({});
}),
"[project]/apps/web/lib/db/schema/equipment.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "customers": (()=>customers),
    "customersRelations": (()=>customersRelations),
    "equipmentBookings": (()=>equipmentBookings),
    "equipmentBookingsRelations": (()=>equipmentBookingsRelations),
    "equipmentSupply": (()=>equipmentSupply),
    "equipmentSupplyRelations": (()=>equipmentSupplyRelations)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/table.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$bigint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/bigint.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/text.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/double-precision.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/integer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/real.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/numeric.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$smallint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/columns/smallint.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$unique$2d$constraint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/unique-constraint.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$foreign$2d$keys$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/pg-core/foreign-keys.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/relations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
;
;
;
const customers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])('Customers', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$bigint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bigint"])({
        mode: 'number'
    }).primaryKey().generatedByDefaultAsIdentity({
        name: 'Customers_id_seq',
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('created_at', {
        withTimezone: true,
        mode: 'string'
    }).defaultNow().notNull(),
    companyName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('company_name').notNull(),
    contactFirstName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('contact_first_name').notNull(),
    contactLastName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('contact_last_name'),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])().notNull(),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])().notNull()
});
const equipmentSupply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])('Equipment Supply', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$bigint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bigint"])({
        mode: 'number'
    }).primaryKey().generatedByDefaultAsIdentity({
        name: 'Equipment Supply_id_seq',
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('created_at', {
        withTimezone: true,
        mode: 'string'
    }).defaultNow().notNull(),
    submissionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('submission_id').notNull().unique(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])().default('Listed').notNull(),
    company: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])().notNull(),
    phoneNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('phone_number'),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])(),
    distanceRadius: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])('distance_radius').notNull(),
    firstName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('first_name').notNull(),
    lastName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('last_name'),
    location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])().notNull(),
    listingPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])('listing_price').notNull(),
    minimumPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])('minimum_price').notNull(),
    quantity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$smallint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["smallint"])().notNull(),
    availability: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])().notNull(),
    category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])().notNull(),
    fromDatetime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('from_datetime', {
        withTimezone: true,
        mode: 'string'
    }),
    toDatetime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('to_datetime', {
        withTimezone: true,
        mode: 'string'
    }),
    geocodeId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$bigint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bigint"])('geocode_id', {
        mode: 'number'
    }),
    geocodeLon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["doublePrecision"])('geocode_lon'),
    geocodeLat: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["doublePrecision"])('geocode_lat')
});
const equipmentBookings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])('Equipment Bookings', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$bigint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bigint"])({
        mode: 'number'
    }).primaryKey().generatedByDefaultAsIdentity({
        name: 'Equipment Bookings_id_seq',
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('created_at', {
        withTimezone: true,
        mode: 'string'
    }).defaultNow().notNull(),
    bookingDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])('booking_date', {
        withTimezone: true,
        mode: 'string'
    }).notNull(),
    customer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])().notNull(),
    supplier: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])(),
    supplierId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$bigint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bigint"])('supplier_id', {
        mode: 'number'
    }).notNull(),
    location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])().notNull(),
    locationLongitude: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["doublePrecision"])('location_longitude'),
    locationLatitude: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["doublePrecision"])('location_latitude'),
    numberEquipment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])('number_equipment').notNull(),
    customerRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])('customer_rate').notNull(),
    hours: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])(),
    supplierRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])('supplier_rate').notNull(),
    sourcerRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])('sourcer_rate').notNull(),
    customerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$bigint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bigint"])('customer_id', {
        mode: 'number'
    }),
    operatorFirstName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('operator_first_name').notNull(),
    operatorLastName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('operator_last_name'),
    bookingGroupId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('booking_group_id').notNull(),
    supplierStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('supplier_status').default('active').notNull(),
    cancellationReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('cancellation_reason'),
    customerStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])('customer_status').default('active').notNull(),
    equipment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])(),
    totalCustomerCharges: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])('total_customer_charges').generatedAlwaysAs(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`((COALESCE(customer_rate, (0)::real) * COALESCE(hours, (0)::real)) * (COALESCE(number_equipment, 0))::double precision)`),
    sourcerTotalEarnings: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])('sourcer_total_earnings').generatedAlwaysAs(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`((COALESCE(sourcer_rate, (0)::real) * COALESCE(hours, (0)::real)) * (COALESCE(number_equipment, 0))::double precision)`),
    totalSupplierEarnings: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])('total_supplier_earnings').generatedAlwaysAs(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`((COALESCE(supplier_rate, (0)::real) * COALESCE(hours, (0)::real)) * (COALESCE(number_equipment, 0))::double precision)`)
}, (table)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$foreign$2d$keys$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["foreignKey"])({
            columns: [
                table.supplierId
            ],
            foreignColumns: [
                equipmentSupply.id
            ],
            name: 'Equipment Bookings_supplier_id_fkey'
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$unique$2d$constraint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["unique"])('Equipment Bookings_id_key').on(table.id)
    ]);
const equipmentSupplyRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(equipmentSupply, ({ many })=>({
        bookings: many(equipmentBookings)
    }));
const equipmentBookingsRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(equipmentBookings, ({ one })=>({
        supplier: one(equipmentSupply, {
            fields: [
                equipmentBookings.supplierId
            ],
            references: [
                equipmentSupply.id
            ]
        }),
        customer: one(customers, {
            fields: [
                equipmentBookings.customerId
            ],
            references: [
                customers.id
            ]
        })
    }));
const customersRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(customers, ({ many })=>({
        bookings: many(equipmentBookings)
    }));
}),
"[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

// Main schema index - exports all tables and types
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/users.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/equipment.ts [app-route] (ecmascript)");
;
;
}),
"[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/users.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/equipment.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <locals>");
}),
"[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ActivityType": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityType"]),
    "activityLogs": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["activityLogs"]),
    "activityLogsRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["activityLogsRelations"]),
    "customers": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"]),
    "customersRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customersRelations"]),
    "equipmentBookings": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"]),
    "equipmentBookingsRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookingsRelations"]),
    "equipmentSupply": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"]),
    "equipmentSupplyRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupplyRelations"]),
    "invitations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["invitations"]),
    "invitationsRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["invitationsRelations"]),
    "teamMembers": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teamMembers"]),
    "teamMembersRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teamMembersRelations"]),
    "teams": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teams"]),
    "teamsRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teamsRelations"]),
    "users": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]),
    "usersRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["usersRelations"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/users.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/equipment.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <locals>");
}),
"[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ActivityType": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ActivityType"]),
    "activityLogs": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["activityLogs"]),
    "activityLogsRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["activityLogsRelations"]),
    "customers": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["customers"]),
    "customersRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["customersRelations"]),
    "equipmentBookings": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["equipmentBookings"]),
    "equipmentBookingsRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["equipmentBookingsRelations"]),
    "equipmentSupply": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["equipmentSupply"]),
    "equipmentSupplyRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["equipmentSupplyRelations"]),
    "invitations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["invitations"]),
    "invitationsRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["invitationsRelations"]),
    "teamMembers": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["teamMembers"]),
    "teamMembersRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["teamMembersRelations"]),
    "teams": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["teams"]),
    "teamsRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["teamsRelations"]),
    "users": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["users"]),
    "usersRelations": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["usersRelations"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <exports>");
}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[project]/apps/web/lib/db/drizzle.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "client": (()=>client),
    "db": (()=>db)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$postgres$2d$js$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/postgres-js/driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$postgres$40$3$2e$4$2e$7$2f$node_modules$2f$postgres$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/postgres@3.4.7/node_modules/postgres/src/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$dotenv$40$16$2e$6$2e$1$2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/dotenv@16.6.1/node_modules/dotenv/lib/main.js [app-route] (ecmascript)");
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$dotenv$40$16$2e$6$2e$1$2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].config();
if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable is not set');
}
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$postgres$40$3$2e$4$2e$7$2f$node_modules$2f$postgres$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(process.env.POSTGRES_URL);
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$postgres$2d$js$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["drizzle"])(client, {
    schema: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
});
}),
"[project]/apps/web/lib/db/queries/users.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getUser": (()=>getUser),
    "getUserWithTeam": (()=>getUserWithTeam)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$0$2d$canary$2e$47_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.0-canary.47_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/auth/session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/drizzle.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/users.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
;
;
;
;
;
async function getUser() {
    const sessionCookie = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$0$2d$canary$2e$47_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).get('session');
    if (!sessionCookie || !sessionCookie.value) {
        return null;
    }
    const sessionData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(sessionCookie.value);
    if (!sessionData || !sessionData.user || typeof sessionData.user.id !== 'number') {
        return null;
    }
    if (new Date(sessionData.expires) < new Date()) {
        return null;
    }
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id, sessionData.user.id), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].deletedAt))).limit(1);
    if (user.length === 0) {
        return null;
    }
    return user[0];
}
async function getUserWithTeam(userId) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        user: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"],
        teamId: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teamMembers"].teamId
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).leftJoin(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teamMembers"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teamMembers"].userId)).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id, userId)).limit(1);
    return result[0];
}
}),
"[project]/apps/web/lib/db/queries/teams.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getTeamByStripeCustomerId": (()=>getTeamByStripeCustomerId),
    "getTeamForUser": (()=>getTeamForUser),
    "updateTeamSubscription": (()=>updateTeamSubscription)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/drizzle.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/users.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/users.ts [app-route] (ecmascript)");
;
;
;
;
async function getTeamByStripeCustomerId(customerId) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teams"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teams"].stripeCustomerId, customerId)).limit(1);
    return result.length > 0 ? result[0] : null;
}
async function updateTeamSubscription(teamId, subscriptionData) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teams"]).set({
        ...subscriptionData,
        updatedAt: new Date()
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teams"].id, teamId));
}
async function getTeamForUser() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUser"])();
    if (!user) {
        return null;
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].query.teamMembers.findFirst({
        where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["teamMembers"].userId, user.id),
        with: {
            team: {
                with: {
                    teamMembers: {
                        with: {
                            user: {
                                columns: {
                                    id: true,
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return result?.team || null;
}
}),
"[project]/apps/web/lib/db/queries/activity.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getActivityLogs": (()=>getActivityLogs)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/drizzle.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/users.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/sql/expressions/select.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/users.ts [app-route] (ecmascript)");
;
;
;
;
async function getActivityLogs() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUser"])();
    if (!user) {
        throw new Error('User not authenticated');
    }
    return await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["activityLogs"].id,
        action: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["activityLogs"].action,
        timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["activityLogs"].timestamp,
        ipAddress: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["activityLogs"].ipAddress,
        userName: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].name
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["activityLogs"]).leftJoin(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["activityLogs"].userId, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id)).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["activityLogs"].userId, user.id)).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["activityLogs"].timestamp)).limit(10);
}
}),
"[project]/apps/web/lib/db/queries/customer.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getAllCustomers": (()=>getAllCustomers),
    "getCustomerByEmail": (()=>getCustomerByEmail),
    "getCustomerById": (()=>getCustomerById),
    "getCustomerForCurrentUser": (()=>getCustomerForCurrentUser),
    "searchCustomersByName": (()=>searchCustomersByName)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/drizzle.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/equipment.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/sql/expressions/select.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/users.ts [app-route] (ecmascript)");
;
;
;
;
async function getCustomerForCurrentUser() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUser"])();
    if (!user || !user.email) {
        return null;
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"].email, user.email)).limit(1);
    return result.length > 0 ? result[0] : null;
}
async function getCustomerByEmail(email) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"].email, email)).limit(1);
    return result.length > 0 ? result[0] : null;
}
async function getCustomerById(customerId) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"].id, customerId)).limit(1);
    return result.length > 0 ? result[0] : null;
}
async function getAllCustomers() {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"]).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"].createdAt));
}
async function searchCustomersByName(searchTerm) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"]).where(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"].companyName} ILIKE ${`%${searchTerm}%`}`).orderBy(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"].companyName);
}
}),
"[project]/apps/web/lib/db/queries/equipment.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getAllEquipmentBookings": (()=>getAllEquipmentBookings),
    "getEquipmentBookingsByCompanyId": (()=>getEquipmentBookingsByCompanyId),
    "getEquipmentBookingsForCurrentUser": (()=>getEquipmentBookingsForCurrentUser),
    "getEquipmentBookingsForUser": (()=>getEquipmentBookingsForUser),
    "getEquipmentSupplyBySubmissionId": (()=>getEquipmentSupplyBySubmissionId),
    "getEquipmentSupplyListings": (()=>getEquipmentSupplyListings)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/drizzle.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/schema/equipment.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.43.1_@types+better-sqlite3@7.6.13_better-sqlite3@11.10.0_postgres@3.4.7/node_modules/drizzle-orm/sql/expressions/select.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/users.ts [app-route] (ecmascript)");
;
;
;
;
async function getEquipmentBookingsForUser(userEmail) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        booking: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"],
        supply: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"]
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"]).innerJoin(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"].supplierId, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"].id)).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"].email, userEmail)).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"].bookingDate));
    return result;
}
async function getEquipmentBookingsForCurrentUser() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUser"])();
    if (!user || !user.email) {
        return [];
    }
    return await getEquipmentBookingsForUser(user.email);
}
async function getAllEquipmentBookings() {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        booking: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"],
        supply: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"],
        customer: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"]
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"]).leftJoin(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"].supplierId, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"].id)).leftJoin(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"].customerId, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customers"].id)).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"].bookingDate));
    return result;
}
async function getEquipmentBookingsByCompanyId(companyId) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        booking: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"],
        supply: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"]
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"]).leftJoin(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"].supplierId, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"].id)).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"].customerId, companyId)).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentBookings"].bookingDate));
    return result;
}
async function getEquipmentSupplyListings(filters) {
    let query = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"]);
    if (filters?.status) {
        query = query.where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"].status, filters.status));
    }
    return await query.orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"].createdAt));
}
async function getEquipmentSupplyBySubmissionId(submissionId) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$43$2e$1_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$11$2e$10$2e$0_postgres$40$3$2e$4$2e$7$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$schema$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["equipmentSupply"].submissionId, submissionId)).limit(1);
    return result.length > 0 ? result[0] : null;
}
}),
"[project]/apps/web/lib/db/queries/index.ts [app-route] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

// Main queries index - exports all query functions
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/users.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$teams$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/teams.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$activity$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/activity.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$customer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/customer.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/equipment.ts [app-route] (ecmascript)");
;
;
;
;
;
}),
"[project]/apps/web/lib/db/queries/index.ts [app-route] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/users.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$teams$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/teams.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$activity$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/activity.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$customer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/customer.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$equipment$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/equipment.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/index.ts [app-route] (ecmascript) <locals>");
}),
"[project]/apps/web/app/api/user/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/db/queries/users.ts [app-route] (ecmascript)");
;
async function GET() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$db$2f$queries$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUser"])();
    return Response.json(user);
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__c037b19f._.js.map