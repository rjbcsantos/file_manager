import router from "./FileManager";

describe("FileManager", () => {
    const routes = [
        { path: '/upload', method: 'post' },
        { path: '/download', method: 'get' },
    ];
    test.each(routes)('`$method` exists on $path', (route) => {
        expect(
            router.stack.some((s) => Object.keys(s.route.methods)
                .includes(route.method)
            )
        ).toBe(true)
        expect(
            router.stack.some((s) => s.route.path === route.path)
        ).toBe(true)
    });
});