import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each(["/pt", "/en", "/es"])("matches the home page for %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe("/$locale/");
  });
});

describe("Private lessons route", () => {
  it("matches a page for /private-lessons", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/en/private-lessons").at(-1)?.routeId).toBe(
      "/$locale/private-lessons",
    );
  });
});

describe("Contact route", () => {
  it("matches a page for /es/contact", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/es/contact").at(-1)?.routeId).toBe("/$locale/contact");
  });
});

describe("Privacy route", () => {
  it("matches a page for /pt/privacy", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/pt/privacy").at(-1)?.routeId).toBe("/$locale/privacy");
  });
});
