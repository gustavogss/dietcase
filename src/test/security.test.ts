import { describe, expect, it } from "vitest";
import { sanitizeUserProfileForStorage } from "@/lib/security";

describe("sanitizeUserProfileForStorage", () => {
  it("remove dados sensíveis antes de persitir no navegador", () => {
    const profile: Record<string, unknown> = {
      id: "user-123",
      name: "Ana Costa",
      email: "ana@example.com",
      weight: 68,
      height: 162,
      imc: 25.9,
      plan: "ESSENCIAL",
      morbidities: ["colesterol"],
      avatarUrl: "https://example.com/avatar.png",
      trialExpiresAt: "2026-12-31T00:00:00.000Z",
    };

    const sanitized = sanitizeUserProfileForStorage(profile);

    expect(sanitized.name).toBe("Ana Costa");
    expect(sanitized.plan).toBe("ESSENCIAL");
    expect(sanitized.email).toBeUndefined();
    expect(sanitized.weight).toBeUndefined();
    expect(sanitized.height).toBeUndefined();
    expect(sanitized.imc).toBeUndefined();
    expect(sanitized.avatarUrl).toBeUndefined();
  });
});
